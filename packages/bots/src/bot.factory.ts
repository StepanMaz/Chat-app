import { ChatConnection, GQLConnection } from "client-lib";
import { Bot, BotInfo } from "./bot";

export class BotInfoProvider {
	constructor(private readonly connection: GQLConnection) {}

	async forName(username: string): Promise<BotInfo> {
		const { data } = await this.connection.query`query FindUser {
            findUser(username: null) {
                id
            }
        }`;
		if (!data.findUser) {
			const new_user = await this.connection.query`
                mutation CerateUser {
                    cerateUser(username: "1", status: "1", image_base64: "1") {
                        id
                    }
                }`;

			data.findUser = new_user.data.createUser;
		}
		const { id } = data.findUser;
		return { client_id: id };
	}
}
