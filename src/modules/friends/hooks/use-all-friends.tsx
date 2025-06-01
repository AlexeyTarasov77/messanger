import { useEffect, useState } from "react";
import { friendsService } from "../services/friends";
import { IUser } from "../../users/types";

export function useAllFriends() {
    const [isLoading, setIsLoading] = useState(false);
    const [allFriends, setAllFriends] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchAllFriends = async () => {
            setIsLoading(true);
            try {
                const allFriends = await friendsService.allFriends();
                console.log("Друзі:", allFriends)
                setAllFriends(allFriends);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllFriends();
    }, []);
    return { allFriends, isLoading };
}
