import { GET } from "../../../shared/api/client";
import { IUser } from "../types";

export const usersService = {
  getUser: async (): Promise<IUser | null> => {
    const resp = await GET<IUser>("/users/me");
    if (resp.success == false) {
      if (resp.status !== 401) {
        throw new Error(resp.message);
      }
      return null
    }
    return resp.data;
  },
}
