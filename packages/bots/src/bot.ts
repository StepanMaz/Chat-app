import { ChatConnection } from "client-lib/src";
import { ServerEvents } from "shared/types/sockets";

export abstract class Bot {
	constructor(
		protected readonly connection: ChatConnection,
		public readonly bot_info: BotInfo
	) {
		connection.on("receiveMessage", (m) => {
			if (m.userId != bot_info.id) {
				this.handleMessage(m);
			}
		});
	}

	protected abstract handleMessage(
		message: ServerEvents["receiveMessage"]
	): void;
	protected abstract handleStatusChaged(
		message: ServerEvents["statusChange"]
	): void;

	protected startTyping(chat_id: number) {
		this.connection.emit("startTyping", { chat_id });
	}

	protected sendMessage(chat_id: number, content: string) {
		this.connection.emit("sendMessage", { chat_id, content });
	}
}

export interface BotInfo {
	id: number;
}
