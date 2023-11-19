import "./App.css";
import { Chat } from "./components/chat";
import { Serach } from "./components/serarch";
import { useAppSelector } from "./hooks/use-app-selector";
import { LoadingState } from "./types&constants";
import { actions } from "./redux/user";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import { useState } from "react";
import { WebSocketProvider } from "./components/websocket.provider";

const UESR_ID = "user-id";

function App() {
	const [retry, setRetry] = useState(false);

	const { state, current } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	if (state === LoadingState.Idle) {
		const user_id = localStorage.getItem(UESR_ID);
		if (!user_id) {
			dispatch(actions.createUser());
		} else {
			setRetry(true);
			dispatch(actions.pullUserById(Number.parseInt(user_id)));
		}
	}

	if (state === LoadingState.Fulfilled) {
		localStorage.setItem(UESR_ID, current!.id.toString());
		console.log("you are", current?.id);
	}

	if (state === LoadingState.Rejected) {
		localStorage.removeItem(UESR_ID);
		if (retry) dispatch(actions.createUser());
	}

	const state_map = {
		[LoadingState.Idle]: () => "Loading...",
		[LoadingState.Pending]: () => "Loading...",
		[LoadingState.Rejected]: () => (retry ? "Error. Retrying." : "Error"),
		[LoadingState.Fulfilled]: () => (
			<WebSocketProvider auth={{ client_id: current?.id! }}>
				<h1>Chat bots 2.0</h1>
				<div className="chat">
					<Chat />
					<Serach />
				</div>
			</WebSocketProvider>
		),
	};

	return state_map[state]();
}

export default App;
