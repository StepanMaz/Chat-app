import { Message } from "../models";

export type AuthData = {
	client_id: number;
};
export type ServerEvents = {
	//name: type
	statusChange: ClientIDPayload & ClientStatusPayload;
	receiveMessage: Message;
	bot_receiveMessage: Message;
	chatMembersUpdate: ChatIDPayload & MembersStatusUpdatePayload;
};
export type ClientEvents = {
	//name: type
	startTyping: ChatIDPayload;
	sendMessage: ChatIDPayload & MessagePayload;
	joinChat: ChatIDPayload;
	inviteToChat: ChatIDPayload & ClientIDPayload;
};

export type ToSocketIOEvents<T> = {
	[K in keyof T]: (data: T[K]) => void;
};

type ID = number;
export type ClientStatus = "online";
export type MemberStatus = "typing";
// payload types
type MembersStatusUpdatePayload = {
	member_statuses: Record<ID, StatusPayload<MemberStatus>>;
};
type ClientStatusPayload = {
	client_statuses: Record<string, StatusPayload<MemberStatus>>;
};
type MessagePayload = { content: string };
type ClientIDPayload = { client_id: ID };
type ChatIDPayload = { chat_id: ID };
// util types
type StatusPayload<T extends string | number> = Record<T, boolean>;
