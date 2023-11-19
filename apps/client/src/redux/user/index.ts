import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../types&constants";
import { createUser, pullUserById } from "./actions";

type UserSlice = {
	current?: {
		id: number;
		username: string;
		status: string;
		image_base64: string;
	};
	state: LoadingState;
};

const initialState: UserSlice = {
	state: LoadingState.Idle,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(pullUserById.pending, (state) => {
				state.state = LoadingState.Pending;
				delete state.current;
			})
			.addCase(pullUserById.rejected, (state) => {
				state.state = LoadingState.Rejected;
			})
			.addCase(pullUserById.fulfilled, (state, res) => {
				state.state = LoadingState.Fulfilled;
				state.current = res.payload.data.user;
			});

		builder
			.addCase(createUser.pending, (state) => {
				state.state = LoadingState.Pending;
				delete state.current;
			})
			.addCase(createUser.rejected, (state) => {
				state.state = LoadingState.Rejected;
			})
			.addCase(createUser.fulfilled, (state, res) => {
				state.state = LoadingState.Fulfilled;
				state.current = res.payload.data.cerateDummyUser;
			});
	},
});

export const { name, reducer } = userSlice;
export const actions = { ...userSlice.actions, createUser, pullUserById };
