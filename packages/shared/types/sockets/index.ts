export type AuthData = {};
export type ServerEvents = {
	//name: type
	statusChange: ClientIDPayload & ClientStatusPayload;
	receiveMessage: ChannelIDPayload & MessagePayload;
	channelMemebersUpdate: ChannelIDPayload & MembersStatusUpdatePayload;
};
export type ClientEvents = {
	//name: type
	startTyping: ChannelIDPayload;
	sendMessage: ChannelIDPayload & MessagePayload;
};

export type ToSocketIOEvents<T> = {
	[K in keyof T]: (data: T[K]) => void;
};

type ID = string | number;
export type ClientStatus = "online";
export type MemberStatus = "typing";
// payload types
type MembersStatusUpdatePayload = {
	member_statuses: Record<ID, Record<string, StatusPayload<MemberStatus>>>;
};
type ClientStatusPayload = {
	client_statuses: Record<string, StatusPayload<MemberStatus>>;
};
type MessagePayload = { content: string };
type ClientIDPayload = { client_id: ID };
type ChannelIDPayload = { channel_id: ID };
// util types
type StatusPayload<T extends ID> = Record<T, boolean>;
