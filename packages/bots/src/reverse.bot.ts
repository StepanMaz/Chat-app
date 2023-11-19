import { ChatConnection, GQLConnection } from "client-lib/src";
import { Bot, BotInfo } from "./bot";
import { Message } from "shared/types/models";

export class ReverseBot extends Bot {
	protected handleMessage(message: Message): void {
		this.startTyping(message.chatId);
		setTimeout(() => {
			this.sendMessage(
				message.chatId,
				message.content.split("").reverse().join("")
			);
		}, this.delay);
	}
	constructor(
		connection: ChatConnection,
		bot_info: BotInfo,
		private readonly delay: number
	) {
		super(connection, bot_info);
	}

	protected handleStatusChaged(message: any): void {}
}
