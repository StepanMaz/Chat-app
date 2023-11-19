import { ChatConnection } from "client-lib/src";
import React, { createContext, useContext } from "react";
import type { AuthData } from "shared/types/sockets";

const WebSocketContext = createContext<ChatConnection | null>(null);

interface WebSocketProviderProps {
	children: React.ReactNode[];
	auth: AuthData;
}

export function WebSocketProvider({ children, auth }: WebSocketProviderProps) {
	const newSocket = new ChatConnection("", auth);

	return (
		<WebSocketContext.Provider value={newSocket}>
			{children}
		</WebSocketContext.Provider>
	);
}

export function useWebSocket() {
	const socket = useContext(WebSocketContext);

	if (!socket) {
		throw new Error("useWebSocket must be used within a WebSocketProvider");
	}

	return socket;
}
