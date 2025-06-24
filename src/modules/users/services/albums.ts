import { PATCH, POST } from "../../../shared/api/client";
import { buildImageUrl, getImageData } from "../../../shared/utils/images";
import { CreateAlbumModal } from "../screens/settings/albums";
import { IAlbum, ICreateAlbumForm } from "../types";

export const albumsService = {
    updateAlbum: async (albumId: number, data: Partial<IAlbum>) => {
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
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("topic", data.topic.name);
        formData.append("created_at", data.created_at);

        const resp = await POST<IAlbum>("/users/albums/", formData);
        if (!resp.success) {
            throw new Error(resp.message);
        }
        return resp.data;
    },
};
