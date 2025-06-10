import { GET } from "../../../shared/api/client";
import { IAlbum } from "../types";

export const settingsService = {
    albums: async () => {
        const resp = await GET<IAlbum[]>("/users/me/albums");
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },
};
