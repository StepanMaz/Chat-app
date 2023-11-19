import "./message.css";

interface MessageProps {
	message: {
		username: string;
		content: string;
		outgoing: boolean;
		// time: Date;
	};
}

export function Message({ message }: MessageProps) {
	const custom_attr = { type: message.outgoing ? "outgoing" : "ingoing" };

	return (
		<div {...custom_attr} className="message-container">
			<div className="message-username">
				<span>{message.username}</span>
				{/* <span>
					{message.time.getHours()}:{message.time.getMinutes()}
				</span> */}
			</div>
			<div className="message-content">
				<p>{message.content}</p>
			</div>
		</div>
	);
}
