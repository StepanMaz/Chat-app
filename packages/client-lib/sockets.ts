import type {
	AuthData,
	ClientEvents,
	ServerEvents,
	ToSocketIOEvents,
} from "shared/types/sockets";
import { type Socket, io } from "socket.io-client";

export class ChatConnection {
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
		this.emit = this.socket.emit.bind(this.socket);
	}

	on: (typeof this.socket)["on"];
	onAny: (typeof this.socket)["onAny"];
	off: (typeof this.socket)["off"];
	offAnt: (typeof this.socket)["offAny"];
	close: (typeof this.socket)["close"];
	emit: (typeof this.socket)["emit"];
}
