import { Platform } from "react-native";

export const SERVER_URL = `http://${Platform.OS == "ios" ? "localhost" : "10.0.2.2"}:8000/api/v1`;
// export const SERVER_URL = "http://192.168.0.115:8000/api/v1"
export const THEME_STORAGE_KEY = "theme";
export const AUTH_TOKEN_KEY = "vibenet__authToken";
export const EXCLUDED_RECOMMENDED_USERS_KEY = "exclude_recommended_users"
