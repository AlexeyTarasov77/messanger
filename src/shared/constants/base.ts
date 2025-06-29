import { Platform } from "react-native";

// export const SERVER_URL = `http://${Platform.OS == "ios" ? "localhost" : "10.0.2.2"}:8000/api/v1`;
// export const WS_SERVER_URL = `ws://${Platform.OS == "ios" ? "localhost" : "10.0.2.2"}:8000`
export const SERVER_URL = process.env.SERVER_URL!
export const WS_SERVER_URL = process.env.WS_SERVER_URL!
export const THEME_STORAGE_KEY = process.env.THEME_STORAGE_KEY!
export const AUTH_TOKEN_KEY = process.env.AUTH_TOKEN_KEY!
export const EXCLUDED_RECOMMENDED_USERS_KEY = process.env.EXCLUDED_RECOMMENDED_USERS_KEY!
