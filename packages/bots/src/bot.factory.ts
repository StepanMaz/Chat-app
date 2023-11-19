import { GQLConnection } from "client-lib/src";
import { BotInfo } from "./bot";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { join } from "path";

const file_name = join(__dirname, "../bot.info.json");

const file = existsSync(file_name)
	? JSON.parse(readFileSync(file_name).toString())
	: {};

const lorem =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

export class BotInfoProvider {
	constructor(private readonly connection: GQLConnection) {}

	async forName(name: string): Promise<BotInfo> {
		if (file[name]) {
			return file[name] as BotInfo;
		}

		const image =
			"data:image/png;base64, " +
			readFileSync(join(__dirname, `../assets/${name.replace(" ", "")}.png`), {
				encoding: "base64",
			});
		const { data } = await this.connection.query`
            mutation CerateUser {
                cerateUser(username: "${name}", status: "${lorem}", image_base64: "${image}") {
                    id
                }
            }`;
		file[name] = data.cerateUser;
		writeFileSync(file_name, JSON.stringify(file));
		return data.cerateUser as BotInfo;
	}
}
