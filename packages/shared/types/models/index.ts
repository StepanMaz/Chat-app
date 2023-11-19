export type User = {
	id: number;
	username: string;
	status?: string;
	image_base64: string;
};

export type Message = {
	id: number;
	userId: number;
	chatId: number;
	createdAt: Date;
	seenAt: Date;
	content: string;
};

export type Chat = {
	id: number;
	messages: Message[];
	members: User[];
};
