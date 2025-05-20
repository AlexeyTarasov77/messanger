import { GET, POST } from "../../../shared/api/client";
import { ICreatePostForm, IPost, IPostWithAuthor } from "../types";

export const postsService = {
  listPosts: async () => {
    const resp = await GET<IPostWithAuthor[]>("/posts/");
    if (resp.success == false) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  createPost: async (data: ICreatePostForm) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('subject', data.subject);
    formData.append('body', data.body);

    if (data.link) {
      formData.append('link', data.link);
    }
    data.tags.forEach(tag => {
      formData.append(`tags`, tag.name);
    });
    data.media.forEach((item, i) => {
      const parts = item.url.split(".")
      const ext = parts[parts.length - 1]
      formData.append(`media`, { uri: item.url, type: `image/${ext}`, name: `media_${i}.${ext}` } as any)
    });
    const resp = await POST<IPost>("/posts/", formData);
    if (resp.success == false) {
      throw new Error(resp.message);
    }
    console.log("Created post", resp)
    return resp.data;
  }
}
