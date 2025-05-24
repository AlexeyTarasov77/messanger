import { useEffect, useState } from "react";
import { IPostTag } from "../types";
import { postsService } from "../services";

export function useTags() {
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState<IPostTag[]>([]);
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const posts = await postsService.listTags();
                setTags(tags);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);
    return { tags, isLoading };
}
