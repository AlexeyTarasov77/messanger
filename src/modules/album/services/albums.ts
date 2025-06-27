import { DELETE, GET, POST } from "../../../shared/api/client";
import {  IUpdateAlbumForm } from "../types";

export const albumService = {
  async updateAlbum(data: IUpdateAlbumForm) {
    return fetch(`/api/albums/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => {
      if (!res.ok) throw new Error("Помилка при оновленні альбому");
      return res.json();
    });
  }
}
