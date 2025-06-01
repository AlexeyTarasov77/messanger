import { useEffect, useState } from "react";
import { postsService } from "../../posts/services";
import { IUser } from "../../users/types";
import { friendsService } from "../services/friends";

export function useRecommendations() {
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoading(true);
            try {
                const recommendations = await friendsService.recommendations();
                console.log("Рекомендовані:", recommendations)
                setRecommendations(recommendations);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecommendations();
    }, []);
    return { recommendations, isLoading };
}
