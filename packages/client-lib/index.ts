import type {
	AuthData,
	ClientEvents,
	ServerEvents,
	ToSocketIOEvents,
} from "shared/types/sockets";
import { type Socket, io } from "socket.io-client";

class ChatConnection {
	private socket: Socket<
		ToSocketIOEvents<ServerEvents>,
		ToSocketIOEvents<ClientEvents>
	>;

	constructor(url: URL, auth: AuthData) {
		this.socket = io(url, { query: { auth: auth } });
		this.on = this.socket.on.bind(this.socket);
		this.onAny = this.socket.onAny.bind(this.socket);
		this.off = this.socket.off.bind(this.socket);
		this.offAnt = this.socket.offAny.bind(this.socket);
		this.close = this.socket.close.bind(this.socket);
	}

	on: (typeof this.socket)["on"];
	onAny: (typeof this.socket)["onAny"];
	off: (typeof this.socket)["off"];
	offAnt: (typeof this.socket)["offAny"];
	close: (typeof this.socket)["close"];
}

export class ConnectionBuilder {
	private url?: URL;
	private auth?: AuthData;
	withUrl(url: URL): Omit<this, "withUrl"> {
		this.url = url;
		return this;
	}

	withAuth(auth: AuthData): Omit<this, "withAuth"> {
		this.auth = auth;
		return this;
	}

	build(): ChatConnection {
		if (!this.url) {
			throw new Error("Chat connection url was not specified.");
		}
		if (!this.auth) {
			throw new Error("Auth for chat connection was not specified.");
		}
		return new ChatConnection(this.url, this.auth);
	}
}
