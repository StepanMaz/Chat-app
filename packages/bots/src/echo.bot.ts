import type { Message } from "shared/types/models";
import { Bot, BotInfo } from "./bot";
import { ChatConnection } from "client-lib/src";

export class EchoBot extends Bot {
	protected handleStatusChaged(message: any): void {}
	protected handleMessage(message: Message): void {
		this.sendMessage(message.chatId, message.content);
	}
}
