import { useEffect, useState } from "react";
import { friendsService } from "../services/friends";
import { IUser } from "../../users/types";

export function useAllFriends() {
    const [isLoading, setIsLoading] = useState(false);
    const [allFriends, setAllFriends] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchAllFiriends = async () => {
            setIsLoading(true);
            try {
                const allFriends = await friendsService.requests();
                setAllFriends(allFriends);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllFiriends();
    }, []);
    return { allFriends, isLoading };
}
