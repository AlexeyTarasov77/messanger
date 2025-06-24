import { useEffect, useState } from "react";
import { IPostTag } from "../types";
import { postsService } from "../services";

export function useTags() {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<IPostTag[]>([]);
  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      try {
        const tags = await postsService.listTags();
        setTags(tags);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTags();
  }, []);
  return { tags, isLoading, setTags };
}
