import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST } from "../../../shared/api/client";
import { ILoginForm, IRegisterForm, IRegisterResponse } from "../types";
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
        const formData = new FormData()

        formData.append("email", data.email)
        formData.append("username", data.username)
        formData.append("password", data.password)
        formData.append("phoneNumber", data.phoneNumber)
        if (data.firstName) {
            formData.append("firstName", data.firstName)
        }
        if (data.lastName) {
            formData.append("lastName", data.lastName)
        }
        formData.append("otp", data.otp)

        if (data.avatar) {
            formData.append("image", new File([data.avatar], "avatar.jpg", {
                type: "image/jpeg"
            }))
        }
        const resp = await POST<IRegisterResponse>("/users/signup", data);
        if (resp.success === false) {
            throw new Error(resp.message);
        }
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, resp.data.token);
        console.log("Успешная регистрация:", resp.data);
        return resp.data;
    },
    sendOTP: async (email: string) => {
        const resp = await POST("/users/send-otp", { "email": email });
        if (resp.success === false) {
            console.log("Failed to send otp token")
            throw new Error(resp.message);
        }
    },
    logOut: async () => {
        await AsyncStorage.removeItem("token");
        console.log("Ви вийшли з акаунту.")
    },
};
