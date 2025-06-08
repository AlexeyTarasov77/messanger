import { DELETE, GET, POST } from "../../../shared/api/client";
import { getImageData } from "../../../shared/utils/images";
import { ICreatePostForm, IPost, IPostWithAuthor } from "../types";

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
    formData.append("body", data.body);

    if (data.link) {
      formData.append("link", data.link);
    }
    data.tags.forEach((tag) => {
      formData.append(`tags`, tag.name);
    });
    data.media.forEach((item) =>
      formData.append(`media`, getImageData(item.url) as any),
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
};
