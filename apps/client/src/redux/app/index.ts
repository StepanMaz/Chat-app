import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getChatWithUser } from "./actions";
import { LoadingState } from "../../types&constants";
import type { User } from "shared/types/models";

type ChatState = {
	chat_state: LoadingState;
	chat?: {
		id: number;
		members: {
			id: number;
			username: string;
			status: string;
			image_base64: string;
			online: string;
		}[];
		messages: {
			id: number;
			userId: number;
			content: string;
			seenAt?: Date;
		}[];
	};
};

const initialState: ChatState = {
	chat_state: LoadingState.Idle,
};

const app_slice = createSlice({
	name: "app",
	initialState,
	reducers: {
		addMessage(
			state,
			action: PayloadAction<{ id: number; content: string; userId: number }>
		) {
			if (!state.chat) return;
			if (!state.chat.messages) {
				state.chat.messages = [];
			}
			state.chat.messages.push(action.payload);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getChatWithUser.pending, (state) => {
				state.chat_state = LoadingState.Pending;
				delete state.chat;
			})
			.addCase(getChatWithUser.rejected, (state, e) => {
				state.chat_state = LoadingState.Rejected;
			})
			.addCase(getChatWithUser.fulfilled, (state, res) => {
				state.chat_state = LoadingState.Fulfilled;
				state.chat = res.payload.data.findChatWihtUserOrCreate;
				console.log(state.chat);
			});
	},
});

export const { name, reducer } = app_slice;
export const actions = { ...app_slice.actions, getChatWithUser };
