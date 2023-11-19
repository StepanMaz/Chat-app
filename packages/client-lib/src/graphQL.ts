import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from "@apollo/client";
import { ChatConnection } from "./sockets";
export class GQLConnection {
	private connection;

	constructor(private readonly uri: string) {
		this.connection = new ApolloClient({
			uri,
			cache: new InMemoryCache(),
			defaultOptions: {
				query: {
					fetchPolicy: "no-cache",
				},
			},
		});
	}

	query(literals: string | readonly string[], ...args: any[]) {
		return this.connection.query({
			query: gql(literals, ...args),
		});
	}
}
