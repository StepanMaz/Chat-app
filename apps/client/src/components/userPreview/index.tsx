import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { actions } from "../../redux/app";
import "./userPreview.css";

interface UserProps {
	user: {
		id: number;
		image_base64: string;
		username: string;
		status: string;
		online: boolean;
	};
}

export function UserPreview({ user }: UserProps) {
	const status_attr = { status: user.online ? "online" : "offline" };

	const dispatch = useAppDispatch();

	return (
		<div
			className="preview-user-container"
			onClick={() => dispatch(actions.getChatWithUser(user.id))}
		>
			<img
				{...status_attr}
				className="preview-profile-pic"
				src={user.image_base64}
				alt="None"
			></img>
			<div className="preview-status-container">
				<span>{user.username}</span>
				<p>{user.status}</p>
			</div>
		</div>
	);
}
