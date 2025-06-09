import { useEffect, useState } from "react";
import { IUser } from "../../users/types";
import { friendsService } from "../services";

export function useRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const requests = await friendsService.requests();
        setRequests(requests);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);
  return { requests, isLoading };
}
