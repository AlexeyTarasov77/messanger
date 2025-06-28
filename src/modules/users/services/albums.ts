import { DELETE, PATCH, POST } from "../../../shared/api/client";
import { buildImageUrl, getImageData } from "../../../shared/utils/images";
import { IAlbum, ICreateAlbumForm } from "../types";

export const albumsService = {
    updateAlbum: async (data: Partial<IAlbum>, albumId: number) => {
        const formData = new FormData();
        if (data.name) {
            formData.append("name", data.name);
        }
        if (data.topic) {
            formData.append("topic_id", String(data.topic.id));
        }
        if (data.shown !== undefined) {
            formData.append("shown", String(data.shown));
        }
        if (data.images) {
            data.images.forEach((item) =>
                formData.append(
                    "images",
                    getImageData(buildImageUrl(item.image)) as any
                )
            );
        }
        const resp = await PATCH<IAlbum>("/users/albums/" + albumId, formData);
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },

    createAlbum: async (data: ICreateAlbumForm) => {
        const resp = await POST<IAlbum>("/users/albums/", data);
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },

    deleteAlbum: async (albumId: number) => {
        const resp = await DELETE(`/users/albums/${albumId}`);
        if (!resp.success) {
            throw new Error(resp.message);
        }
    },
};
