import { useEffect, useState } from "react";
import { settingsService } from "../services";
import { IAlbum } from "../types";


export function useAlbums() {
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      try {
        const albums = await settingsService.albums();
        setAlbums(albums);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlbums();
  }, []);
  return { albums, isLoading };
}
