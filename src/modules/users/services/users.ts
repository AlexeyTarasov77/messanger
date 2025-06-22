import { GET, PATCH } from "../../../shared/api/client";
import { getImageData } from "../../../shared/utils/images";
import { IUser, IUserExtended, IUserProfile } from "../types";

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
    updateUser: async (data: Partial<IUser & { birthDate: string, avatar: string }>): Promise<IUser> => {
        const formData = new FormData();
        if (data.username) {
            formData.append("username", data.username);
        }
        if (data.first_name) {
            formData.append("firstName", data.first_name);
        }
        if (data.last_name) {
            formData.append("lastName", data.last_name);
        }
        if (data.email) {
            formData.append("email", data.email);
        }
        if (data.birthDate) {
            formData.append("birthDate", data.birthDate);
        }
        if (data.avatar) {
            formData.append("avatar", getImageData(data.avatar) as any);
        }
        const resp = await PATCH<IUser>("/users/me/update", formData);
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },
    getUserById: async (userId: number): Promise<IUserProfile | null> => {
        const resp = await GET<IUserProfile>(`/users/${userId}`);
        if (resp.success == false) {
            if (resp.status !== 404) {
                throw new Error(resp.message);
            }
            return null;
        }
        return resp.data;
    },
    getFriendsCount: async (): Promise<number> => {
        const resp = await GET<{ count: number }>("/users/friends/count")
        if (resp.success == false) {
            throw new Error(resp.message);
        }
        return resp.data.count;
    }
};
