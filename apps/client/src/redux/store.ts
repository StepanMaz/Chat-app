import {
	MiddlewareArray,
	ThunkMiddleware,
	configureStore,
} from "@reduxjs/toolkit";
import { reducer as app_reducer } from "./app";
import { reducer as user_reducer } from "./user";
import { reducer as serch_reducer } from "./search";
import { gql_connection } from "../connection";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

class Store {
	readonly instance;

	constructor() {
		const extraArgument = this.extraArgument;

		this.instance = configureStore({
			reducer: {
				app: app_reducer,
				user: user_reducer,
				search: serch_reducer,
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					thunk: {
						extraArgument,
					},
				}),
		});
	}

	get extraArgument() {
		return {
			gql_connection,
			storage: localStorage,
		};
	}
}

export const store = new Store();

type StoreInfo = typeof store.instance extends ToolkitStore<
	infer State,
	any,
	MiddlewareArray<[ThunkMiddleware<any, any, infer Extra>]>
>
	? { state: State; extra: Extra }
	: any;

export type StoreState = StoreInfo["state"];

export type AsyncThunkConfig = {
	state: StoreInfo["state"];
	dispatch: typeof store.instance.dispatch;
	extra: StoreInfo["extra"];
	rejectValue?: unknown;
	serializedErrorType?: unknown;
	pendingMeta?: unknown;
	fulfilledMeta?: unknown;
	rejectedMeta?: unknown;
};
