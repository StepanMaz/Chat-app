import { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/use-app-selector";
import { LoadingState } from "../../types&constants";
import { Message } from "../message";
import { User } from "../user";
import { useWebSocket } from "../websocket.provider";
import "./chat.css";
import { ServerEvents, ToSocketIOEvents } from "shared/types/sockets";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { actions } from "../../redux/app";

export function Chat() {
	const { chat, chat_state, user } = useAppSelector((state) => ({
		chat: state.app.chat,
		chat_state: state.app.chat_state,
		user: state.user.current,
	}));

	const dispatch = useAppDispatch();

	const typing_placeholder = useRef<HTMLParagraphElement>(null);
	const input = useRef<HTMLInputElement>(null);

	const connection = useWebSocket();
	useEffect(() => {
		if (!chat) return;

		connection.emit("joinChat", { chat_id: chat!.id });

		let timeout: any;

		type MemberUpdate = ToSocketIOEvents<ServerEvents>["chatMembersUpdate"];

		const chatMemebersUpdateListener: MemberUpdate = ({ chat_id }) => {
			if (chat_id != chat!.id) return;

			typing_placeholder.current!.innerText = `${
				(chat!.members.find((u) => u.id != user!.id) ?? user!).username
			} is typing`;

			clearTimeout(timeout);
			timeout = setTimeout(() => {
				if (typing_placeholder.current)
					typing_placeholder.current.innerText = "";
			}, 3000);
		};
		connection.on("chatMembersUpdate", chatMemebersUpdateListener);

		type MessageReceive = ToSocketIOEvents<ServerEvents>["receiveMessage"];

		const messageReceiveListener: MessageReceive = (data) => {
			if (chat.id == data.chatId) {
				dispatch(actions.addMessage(data));
			}
		};

		connection.on("receiveMessage", messageReceiveListener);

		return () => {
			connection.off("chatMembersUpdate", chatMemebersUpdateListener);
			connection.off("receiveMessage", messageReceiveListener);
		};
	}, [chat, typing_placeholder]);

	function getMember() {
		const member = chat!.members.find((u) => u.id != user!.id) ?? user!;
		connection.emit("inviteToChat", {
			chat_id: chat!.id,
			client_id: member.id,
		});
		return member;
	}

	const state_map = {
		[LoadingState.Idle]: () => "Choose chat ==>",
		[LoadingState.Pending]: () => "Loading...",
		[LoadingState.Rejected]: () => "Error.",
		[LoadingState.Fulfilled]: () => (
			<div className="chat-section">
				<User user={getMember()} />
				<div className="chat-container">
					<Messages />
					<div className="chat-input">
						<p ref={typing_placeholder} className="status"></p>
						<input
							ref={input}
							onChange={() =>
								connection.emit("startTyping", { chat_id: chat!.id })
							}
							placeholder="Start chatting!"
						></input>
						<button
							onClick={() => {
								connection.emit("sendMessage", {
									chat_id: chat!.id,
									content: input.current!.value,
								});
								input.current!.value = "";
							}}
						>
							Send message
						</button>
					</div>
				</div>
			</div>
		),
	};

	return state_map[chat_state]();
}

function Messages() {
	const { messages, members, user } = useAppSelector((state) => ({
		messages: state.app.chat!.messages,
		members: state.app.chat!.members,
		user: state.user.current!,
	}));

	return (
		<div className="messages">
			{messages?.map(({ content, userId, id }) => (
				<Message
					key={id}
					message={{
						content,
						username: members.find((u) => u.id == userId)?.username ?? "",
						outgoing: user!.id != userId,
					}}
				/>
			))}
		</div>
	);
}
