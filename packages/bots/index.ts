import { ChatConnection, GQLConnection } from "client-lib/src";
import { BotInfoProvider } from "./src/bot.factory";
import { SpamBot } from "./src/spam.bot";
import { EchoBot } from "./src/echo.bot";
import { IgnoreBot } from "./src/ignore.bot";
import { ReverseBot } from "./src/reverse.bot";

const gql_connection = new GQLConnection("http://localhost:3000/graphql");

const info_factory = new BotInfoProvider(gql_connection);

const bots: Record<string, any> = {};

async function bootstrap() {
	const spam_bot_info = await info_factory.forName("Spam Bot");
	bots[1] = new SpamBot(
		new ChatConnection("ws://localhost:3000", {
			client_id: spam_bot_info.id,
		}),
		spam_bot_info,
		[10000, 120000],
		gql_connection
	);

	const echo_bot_info = await info_factory.forName("Echo Bot");
	bots[2] = new EchoBot(
		new ChatConnection("ws://localhost:3000", {
			client_id: echo_bot_info.id,
		}),
		echo_bot_info
	);

	const ignore_bot_info = await info_factory.forName("Ignore Bot");
	bots[3] = new IgnoreBot(
		new ChatConnection("ws://localhost:3000", {
			client_id: ignore_bot_info.id,
		}),
		ignore_bot_info
	);

	const reverse_bot_info = await info_factory.forName("Reverse Bot");
	bots[4] = new ReverseBot(
		new ChatConnection("ws://localhost:3000", {
			client_id: reverse_bot_info.id,
		}),
		reverse_bot_info,
		3000
	);
}

setTimeout(bootstrap, 3000);
