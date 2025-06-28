import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useEffect, useState } from "react";
import { AUTH_TOKEN_KEY, WS_SERVER_URL } from "../../../../../shared/constants";
import { io, Socket } from "socket.io-client";
import { SocketCtx } from "./context";
import { useAuthCtx } from "../auth/context";


export function SocketProvider({ children }: { children: ReactNode }) {
    const [onlineUsersIds, setOnlineUsersIds] = useState<number[]>([])
    const [socket, setSocket] = useState<Socket | null>(null);
    const { isAuthenticated } = useAuthCtx()
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
            setToken(token)
        }
        getToken()
        if (!token) return;
        const newSocket = io(WS_SERVER_URL, { auth: { token: `Bearer ${token}` } });
        newSocket.on("connect", () => {
            console.log("Socket connection is ok");
        });
        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
        newSocket.on("listOnlineUsers", (data: { usersIds: number[] }) => {
            setOnlineUsersIds(data.usersIds)
        })
        newSocket.on("connectedUser", (data: { userId: number }) => {
            console.log("NEW USER CONNECTED", data.userId)
            setOnlineUsersIds(prev => [...prev, data.userId])
        })
        newSocket.on("disconnectedUser", (data: { userId: number }) => {
            console.log("USER DISCONNECTED", data.userId)
            setOnlineUsersIds(prev => prev.filter(connectedId => connectedId !== data.userId))
        })
        setSocket(newSocket);
        return () => {
            newSocket?.disconnect();
            setSocket(null);
        };
    }, [isAuthenticated, token]);
    console.log("ONLINE USERS", onlineUsersIds)

    return (
        <SocketCtx.Provider value={{ socket, checkUserOnline: (userId: number) => onlineUsersIds.includes(userId) }}>{children}</SocketCtx.Provider>
    );
}
