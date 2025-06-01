import { useEffect, useState } from "react";
import { postsService } from "../../posts/services";
import { IUser } from "../../users/types";
import { friendsService } from "../services/friends";

export function useRequests() {
    const [isLoading, setIsLoading] = useState(false);
    const [requests, setRequests] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchRequests = async () => {
            setIsLoading(true);
            try {
                const requests = await friendsService.requests();
                console.log("Requests:", requests)
                setRequests(requests);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRequests();
    }, []);
    return { requests, isLoading };
}
