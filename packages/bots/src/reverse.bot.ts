import { ChatConnection, GQLConnection } from "client-lib";
import { Bot, BotInfo } from "./bot";

export class ReverseBot extends Bot {
	constructor(
		connection: ChatConnection,
		bot_info: BotInfo,
		private readonly delay: number
	) {
		super(connection, bot_info);
	}

	protected handleMessage(
		message: { chat_id: number } & { content: string }
	): void {
		setTimeout(() => {
			this.sendMessage(
				message.chat_id,
				message.content.split("").reverse().join("")
			);
		}, this.delay);
	}

	protected handleStatusChaged(message: any): void {}
}
