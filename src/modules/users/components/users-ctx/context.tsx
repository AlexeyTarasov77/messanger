import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";
import { authService, usersService } from "../../services";
import { ILoginForm, IRegisterForm, IUser, IUserExtended } from "../../types";
import { getErrorMessage } from "../../../../shared/utils/errors";

export type User = IUserExtended & { displayName: string, avatarUrl: string }

interface IUserCtx {
    user: User | null;
    isLoading: boolean;
    login: (data: ILoginForm) => Promise<string | void>;
    register: (data: IRegisterForm) => Promise<string | void>;
    logout: () => void;
}

const UserCtx = createContext<IUserCtx | null>(null);

export function useUserCtx(): IUserCtx {
    const ctx = useContext(UserCtx);
    if (!ctx) throw new Error("ctx not provided");
    return ctx;
}

export function UsersProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const getDisplayName = (user: IUser) => {
        let finalName;
        if (user.firstName) {
            finalName = user.firstName
            if (user.lastName) {
                finalName += " " + user.lastName
            }
        }
        return finalName || user.username || user.email
    }
    const defaultAvatarUrl = "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png"

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const user = await usersService.getUser();
                user ? setUser({ ...user, displayName: getDisplayName(user), avatarUrl: user.avatarUrl || defaultAvatarUrl }) : setUser(null);
            } catch (err) {
                console.log("Не удалось получить пользователя:", err);
                throw err
            } finally {
                setIsLoading(false)
            }
        };

        fetchUser();
    }, [token]);

    const login = async (data: ILoginForm) => {
        try {
            setIsLoading(true)
            const token = await authService.login(data);
            setToken(token);
        } catch (err) {
            return getErrorMessage(err);
        } finally {
            setIsLoading(false)
        }
    };

    const register = async (data: IRegisterForm) => {
        try {
            setIsLoading(true)
            const resp = await authService.register(data);
            setToken(resp.token);
        } catch (err) {
            return getErrorMessage(err);
        } finally {
            setIsLoading(false)
        }
    };

    const logout = async () => {
        await authService.logOut()
        setUser(null)
    }

    return (
        <UserCtx.Provider value={{ user, login, register, isLoading, logout }}>
            {children}
        </UserCtx.Provider>
    );
}
