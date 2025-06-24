import { useEffect, useState } from "react";
import { usersService } from "../services";
import { IUserProfile } from "../types";
import { getErrorMessage } from "../../../shared/utils/errors";

export function useGetUserById(userId: number) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [error, setError] = useState("")

    useEffect(() => {
        if (!userId || isNaN(userId)) return;
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const user = await usersService.getUserById(Number(userId));
                setUser(user);
            } catch (err) {
                console.log("Не удалось получить пользователя:", err);
                setError(getErrorMessage(err))
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId]);
    return { user, isLoading, error };
}
