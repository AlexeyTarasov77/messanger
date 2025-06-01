import { GET } from "../../../shared/api/client";
import { IUser } from "../../users/types";

export const friendsService = {
    allFriends: async () => {
        const resp = await GET<IUser[]>("/users/all-friends");
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },
    requests: async () => {
        const resp = await GET<IUser[]>("/users/requests");
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },
    recommendations: async () => {
        const resp = await GET<IUser[]>("/users/admin/list-users");
        if (!resp.success) {
            throw new Error(resp.message);
        }
        console.log(resp.data)
        return resp.data;
    },
};
