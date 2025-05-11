import { GET } from "../../../shared/api/client";
import { IUser } from "../types";

export const usersService = {
  getUser: async (): Promise<IUser> => {
    const resp = await GET<IUser>("/users/me");
    if (resp.success == false) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
}
