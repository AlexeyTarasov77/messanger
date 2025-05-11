import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL, AUTH_TOKEN_KEY } from "../constants";
import { APIResponse } from "./types";

export async function sendReq<T>(
    path: string | URL,
    options?: RequestInit
): APIResponse<T> {
    let url: string = `${SERVER_URL}${path}`;
    if (path instanceof URL) {
        url = path.toString();
    }
    console.log("Sending request to: ", url);
    const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (authToken) {
        const headers = new Headers(options?.headers);
        headers.append("Authorization", `Bearer ${authToken}`);
        if (options) {
            options.headers = headers;
        } else {
            options = { headers };
        }
    }
    try {
        const resp = await fetch(url, options);
        // token is expired and can't be used in subsequent requests
        if (resp.status === 401 && authToken) {
            console.log("Expired auth token. Retrying");
            await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
            // retry request
            return await sendReq(path, options);
        }
        let respData
        if (resp.status === 204) {
            respData = { success: true, data: null }
            console.log("Received empty response (204)")
        } else {
            respData = await resp.json();
            console.log("Response received: ", respData);
        }
        return { ...respData, status: resp.status } as any;
    } catch (err) {
        console.error("Fetch failed: ", err);
        throw err;
    }
}

export async function GET<T>(path: string | URL): APIResponse<T> {
    return await sendReq(path, {
        method: "GET"
    });
}

export async function POST<T>(
    path: string | URL,
    data: object,
): APIResponse<T> {
    return await sendReq(path, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json" },
    });
}
