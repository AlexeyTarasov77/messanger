import { createContext, ReactNode, use, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketCtx {
	socket: Socket | null;
	checkUserOnline: (userId: number) => boolean;
}

export const SocketCtx = createContext<ISocketCtx | null>(null);

export function useSocketCtx(): ISocketCtx {
	const ctx = useContext(SocketCtx);
	if (!ctx) throw new Error("Socket context not provided");
	return ctx;
}


