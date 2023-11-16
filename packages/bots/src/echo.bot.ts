import { Bot } from "./bot";

export class EchoBot extends Bot {
	protected handleStatusChaged(message: any): void {}
	protected handleMessage(
		message: { chat_id: number } & { content: string }
	): void {
		this.sendMessage(message.chat_id, message.content);
	}
}
