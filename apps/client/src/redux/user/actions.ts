import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AsyncThunkConfig } from "../store";

export const pullUserById = createAsyncThunk(
	`user/pullUserById`,
	(
		id: number,
		{ extra: { gql_connection } }: GetThunkAPI<AsyncThunkConfig>
	) => {
		return gql_connection.query`
            query User {
                user(id: ${id}) {
                    id
                    username
                    status
                    image_base64
                }
            }`;
	}
);

export const createUser = createAsyncThunk(
	`user/createUser`,
	(
		_: undefined,
		{ extra: { gql_connection } }: GetThunkAPI<AsyncThunkConfig>
	) => {
		return gql_connection.query`
            mutation CerateDummyUser {
                cerateDummyUser {
                    id
                    username
                    status
                    image_base64
                }
            }`;
	}
);
