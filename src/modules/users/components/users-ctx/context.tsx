import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";
import { authService, usersService } from "../../services";
import { ILoginForm, IRegisterForm, IUser } from "../../types";
import { getErrorMessage } from "../../../../shared/utils/errors";

interface IUserCtx {
    user: IUser | null;
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
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const resp = await usersService.getUser();
                setUser(resp);
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
            setUser(resp.user);
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
