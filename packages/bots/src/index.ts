import { ChatConnection, GQLConnection } from "client-lib";
import { BotInfoProvider } from "./bot.factory";
import { SpamBot } from "./spam.bot";
import { EchoBot } from "./echo.bot";
import { IgnoreBot } from "./ignore.bot";
import { ReverseBot } from "./reverse.bot";

const gql_connection = new GQLConnection("localhost:3000/graphql");

const info_factory = new BotInfoProvider(gql_connection);

const bots: Record<string, any> = {};

async function bootstrap() {
	const spam_bot_infp = await info_factory.forName("Spam Bot");
	bots[1] = new SpamBot(
		new ChatConnection(new URL("localhost:3000/chats"), spam_bot_infp),
		spam_bot_infp,
		[10000, 120000],
		gql_connection
	);

	const echo_bot_infp = await info_factory.forName("Echo Bot");
	bots[2] = new EchoBot(
		new ChatConnection(new URL("localhost:3000/chats"), echo_bot_infp),
		echo_bot_infp
	);

	const ignore_bot_infp = await info_factory.forName("Ignore Bot");
	bots[3] = new IgnoreBot(
		new ChatConnection(new URL("localhost:3000/chats"), ignore_bot_infp),
		ignore_bot_infp
	);

	const reverse_bot_infp = await info_factory.forName("Reverse Bot");
	bots[4] = new ReverseBot(
		new ChatConnection(new URL("localhost:3000/chats"), reverse_bot_infp),
		reverse_bot_infp,
		3000
	);
}

bootstrap();
