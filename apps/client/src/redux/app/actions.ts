import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AsyncThunkConfig } from "../store";

export const getChatWithUser = createAsyncThunk(
	`app/getChatWithUser`,
	(
		client_id: number,
		{ extra: { gql_connection }, getState }: GetThunkAPI<AsyncThunkConfig>
	) => {
		const user = getState().user.current;
		if (!user) return Promise.reject("No current user");

		return gql_connection.query`
            mutation FindChatWihtUserOrCreate {
                findChatWihtUserOrCreate(
                    client_id1: ${client_id},
                    client_id2: ${user.id}
                ) {
                id
                createdAt
                updatedAt
                members {
                    id
                    username
                    status
                    image_base64
                }
                messages {
                    id
                    userId
                    chatId
                    createdAt
                    content
                }
            }
        }`;
	}
);

export const sendMessage = createAsyncThunk(
	`app/getChatWithUser`,
	(
		client_id: number,
		{ extra: { gql_connection }, getState }: GetThunkAPI<AsyncThunkConfig>
	) => {
		const user = getState().user.current;

		if (!user) return Promise.reject("No current user");

		return gql_connection.query`
            mutation FindChatWihtUserOrCreate {
                findChatWihtUserOrCreate(
                    client_id1: ${client_id},
                    client_id2: ${user.id}
                ) {
                id
                createdAt
                updatedAt
                messages {
                    content
                    userId
                    chatId
                    createdAt
                }
            }
        }`;
	}
);
