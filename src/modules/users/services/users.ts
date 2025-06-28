import { Dayjs } from "dayjs";
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
    checkAuthenticated: async (): Promise<boolean> => {
        const resp = await GET<{ isAuthenticated: boolean }>("/users/check-auth");
        if (resp.success == false) {
            throw new Error(resp.message);
        }
        return resp.data.isAuthenticated;
    },
    updateUser: async (data: Partial<IUser & { date_of_birth: Dayjs, avatar: string }>): Promise<IUser> => {
        const formData = new FormData();
        if (data.username) {
            formData.append("username", data.username);
        }
        if (data.first_name) {
            formData.append("first_name", data.first_name);
        }
        if (data.last_name) {
            formData.append("last_name", data.last_name);
        }
        if (data.email) {
            formData.append("email", data.email);
        }
        if (data.date_of_birth) {
            formData.append("date_of_birth", data.date_of_birth.format("YYYY-MM-DD"));
        }
        if (data.avatar) {
            formData.append("avatar", getImageData(data.avatar) as any);
        }

        if (data.password) {
            formData.append("password", data.password)
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
