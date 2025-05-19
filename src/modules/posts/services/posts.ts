import { GET } from "../../../shared/api/client";
import { IPostWithAuthor } from "../types";

export const postsService = {
  listPosts: async () => {
    const resp = await GET<IPostWithAuthor[]>("/posts/");
    if (resp.success == false) {
      throw new Error(resp.message);
    }
    return resp.data;
  }
}
