import { PATCH } from "../../../shared/api/client";
import { buildImageUrl, getImageData } from "../../../shared/utils/images";
import { IAlbum } from "../types";

export const albumsService = {
  updateAlbum: async (albumId: number, data: Partial<IAlbum>) => {
    const formData = new FormData()
    if (data.name) {
      formData.append("name", data.name)
    }
    if (data.topic) {
      formData.append("topic_id", String(data.topic.id))
    }
    if (data.shown !== undefined) {
      formData.append("shown", String(data.shown))
    }
    if (data.images) {
      data.images.forEach((item) =>
        formData.append("images", getImageData(buildImageUrl(item.image)) as any),
      );
    }
    const resp = await PATCH<IAlbum>("/users/albums/" + albumId, formData)
    if (!resp.success) {
      throw new Error(resp.message)
    }
    return resp.data
  }
}
