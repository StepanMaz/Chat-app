import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../types&constants";
import { fetchSeachData } from "./actions";

type SearchSlice = {
	search: string;
	state: LoadingState;
	data: {
		id: number;
		status: string;
		image_base64: string;
		username: string;
	}[];
	online: boolean;
};

const initialState: SearchSlice = {
	state: LoadingState.Idle,
	search: "",
	data: [],
	online: true,
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setOnline(state, action: PayloadAction<boolean>) {
			state.online = action.payload;
		},
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchSeachData.pending, (state) => {
				state.state = LoadingState.Pending;
			})
			.addCase(fetchSeachData.rejected, (state) => {
				state.state = LoadingState.Rejected;
			})
			.addCase(fetchSeachData.fulfilled, (state, res) => {
				state.state = LoadingState.Fulfilled;
				state.data = res.payload.data.findUser;
			});
	},
});

export const { name, reducer } = searchSlice;
export const actions = {
	...searchSlice.actions,
	findUsersByName: fetchSeachData,
};
