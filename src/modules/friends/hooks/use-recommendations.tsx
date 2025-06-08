import { useEffect, useState } from "react";
import { IUser } from "../../users/types";
import { friendsService } from "../services";

export function useRecommendations() {
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoading(true);
            try {
                const recommendations = await friendsService.recommendations();
                setRecommendations(recommendations);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecommendations();
    }, []);
    return { recommendations, isLoading };
}
