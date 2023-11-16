import { ChatConnection, GQLConnection } from "client-lib";
import { Bot, BotInfo } from "./bot";

export class SpamBot extends Bot {
	constructor(
		connection: ChatConnection,
		bot_info: BotInfo,
		private readonly delay: [number, number],
		private readonly gql_connection: GQLConnection
	) {
		super(connection, bot_info);

		this.spam();
	}

	protected handleMessage(
		message: { chat_id: number } & { content: string }
	): void {}

	protected handleStatusChaged(message: any): void {}

	private spam() {
		setTimeout(async () => {
			const res = await this.gql_connection.query`query User {
				user(id: ${this.bot_info.client_id}) {
					chats {
						id
					}
				}
			}`;

			for (const chat of res.data.user.chats) {
				this.sendMessage(chat.id, "hihihihi");
			}
		}, this.getRandomTime());
	}

	private getRandomTime() {
		return Math.random() * (this.delay[1] - this.delay[0]) + this.delay[0];
	}
}
