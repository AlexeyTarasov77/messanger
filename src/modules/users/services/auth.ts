import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST } from "../../../shared/api/client";
import { ILoginForm, ILoginResponse, IRegisterForm, IRegisterResponse } from "../types";
import { AUTH_TOKEN_KEY } from "../../../shared/constants";


export const authService = {
  login: async (data: ILoginForm): Promise<string> => {
    const resp = await POST<ILoginResponse>("/users/signin", data);
    if (resp.success == false) {
      throw new Error(resp.message)
    }
    const token = resp.data.token
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    console.log("Успешный вход:", resp.data);
    return token
  },
  register: async (data: IRegisterForm): Promise<IRegisterResponse> => {
    const resp = await POST<IRegisterResponse>("/users/signup", data);
    if (resp.success == false) {
      throw new Error(resp.message)
    }
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, resp.data.token);
    console.log("Успешная регистрация:", resp.data);
    return resp.data
  }
}
