import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AsyncThunkConfig } from "../store";

export const fetchSeachData = createAsyncThunk(
	`search/findUsersByName`,
	(
		_: void,
		{ extra: { gql_connection }, getState }: GetThunkAPI<AsyncThunkConfig>
	) => {
		const { search, online } = getState().search;

		return gql_connection.query`
			query FindUser {
				findUser(username: "${search}", online: ${online}) {
					id
					username
					status
					image_base64
				}
			}`;
	}
);
