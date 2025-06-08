import { GET, PATCH } from "../../../shared/api/client";
import { IUser, IUserExtended } from "../types";

export const usersService = {
  getUser: async (): Promise<IUserExtended | null> => {
    const resp = await GET<IUserExtended>("/users/me");
    if (resp.success == false) {
      if (resp.status !== 401) {
        throw new Error(resp.message);
      }
      return null
    }
    return resp.data;
  },
  updateUser: async (data: Partial<IUser>): Promise<IUser> => {
    const formData = new FormData()
    if (data.username) {
      formData.append("username", data.username)
    }
    if (data.firstName) {
      formData.append("firstName", data.firstName)
    }
    if (data.lastName) {
      formData.append("lastName", data.lastName)
    }
    if (data.email) {
      formData.append("email", data.email)
    }
    if (data.birthDate) {
      formData.append("birthDate", data.birthDate)
    }
    const resp = await PATCH<IUser>("/users/me/update", formData)
    if (!resp.success) {
      throw new Error(resp.message)
    }
    return resp.data
  }
}
