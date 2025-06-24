import { DELETE, GET, POST } from "../../../shared/api/client";
import { getImageData } from "../../../shared/utils/images";
import { ICreatePostForm, IPost, IPostTag, IPostWithAuthor } from "../types";

export const postsService = {
    listPosts: async () => {
        const resp = await GET<IPostWithAuthor[]>("/posts/");
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },
    createPost: async (data: ICreatePostForm) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("subject", data.subject);
        formData.append("body", data.content);

        if (data.links) {
            data.links.map(
                (link) => link.value && formData.append("links", link.value)
            );
        }
        data.tags.forEach((tag) => {
            formData.append(`tags`, tag.name);
        });
        data.images.forEach((item) =>
            formData.append(`media`, getImageData(item) as any)
        );
        const resp = await POST<IPost>("/posts/", formData);
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },
    deletePost: async (postId: number) => {
        const resp = await DELETE(`/posts/${postId}`);
        if (!resp.success) {
            throw new Error(resp.message);
        }
    },
    listTags: async () => {
        const resp = await GET<IPostTag[]>("/posts/tags/");
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },

    createTag: async (name: string) => {
        const resp = await POST<IPostTag>("/posts/create-tag/", {name: name});
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },
};
