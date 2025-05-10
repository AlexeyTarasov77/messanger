import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET, POST } from "../../../shared/api/client";
import { ILoginForm, IRegisterForm, IRegisterResponse, IUser } from "../types";
import { AUTH_TOKEN_KEY } from "../../../shared/constants";

export const authService = {
    login: async (data: ILoginForm): Promise<string> => {
        const resp = await POST<string>("/users/signin", data);
        if (resp.success == false) {
            throw new Error(resp.message);
        }
        const token = resp.data;
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
        console.log("Успешный вход:", resp.data);
        return token;
    },
    register: async (data: IRegisterForm): Promise<IRegisterResponse> => {
        const resp = await POST<IRegisterResponse>("/users/signup", data);
        if (resp.success == false) {
            throw new Error(resp.message);
        }
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, resp.data.token);
        console.log("Успешная регистрация:", resp.data);
        return resp.data;
    },

    getUser: async (): Promise<IUser> => {
        const resp = await GET<IUser>("/users/me");
        if (resp.success == false) {
            throw new Error(resp.message);
        }
        return resp.data;
    },

    logOut: async () => {
        await AsyncStorage.removeItem("token");
        console.log("Ви вийшли з акаунту.")
    },
};
