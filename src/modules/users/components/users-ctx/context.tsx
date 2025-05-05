import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";
import { authService } from "../../services";
import { ILoginForm, IRegisterForm, IUser } from "../../types";

interface IUserCtx {
    user: IUser | null;
    login: (data: ILoginForm) => Promise<string | void>;
    register: (data: IRegisterForm) => Promise<string | void>;
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
    useEffect(() => {
        if (!token) return;
        const fetchUser = async () => {
            try {
                const resp = await authService.getUser();
                setUser(resp);
            } catch (err) {
                console.log("Не удалось получить пользователя:", err);
            }
        };

        fetchUser();
    }, [token]);

    const login = async (data: ILoginForm) => {
        try {
            const token = await authService.login(data);
            setToken(token);
        } catch (err) {
            return err.message;
        }
    };

    const register = async (data: IRegisterForm) => {
        try {
            const resp = await authService.register(data);
            setUser(resp.user);
            setToken(resp.token);
        } catch (err) {
            return err.message;
        }
    };

    return (
        <UserCtx.Provider value={{ user, login, register }}>
            {children}
        </UserCtx.Provider>
    );
}
