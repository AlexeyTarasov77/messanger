import { useEffect, useState } from "react";
import { usersService } from "../services";
import { IUserExtended } from "../types";

export function useGetUserById(userId: number) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<IUserExtended | null>(null);

    useEffect(() => {
        if (!userId || isNaN(userId)) return;
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const user = await usersService.getUserById(userId);
                setUser(user);
            } catch (err) {
                console.log("Не удалось получить пользователя:", err);
                throw err;
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);
    return { user, isLoading };
}
