import { GET } from "../../../shared/api/client";
import { IUserExtended } from "../types";

export const usersService = {
  getUser: async (): Promise<IUserExtended | null> => {
    const resp = await GET<IUserExtended>("/users/me");
    if (resp.success == false) {
      if (resp.status !== 401) {
        throw new Error(resp.message);
      }
      return null;
    }
    return resp.data;
  },
};
