import { HTMLAttributes } from "react";
import "./user.css";

interface UserProps extends HTMLAttributes<HTMLElement> {
	user: {
		image_base64: string;
		username: string;
		status: string;
	};
}

export function User({ user, className, ...rest }: UserProps) {
	return (
		<div className={"user-container ".concat(className ?? "")} {...rest}>
			<img className="profile-pic" src={user.image_base64} alt="None"></img>
			<div className="status-container">
				<span>{user.username}</span>
				<p>{user.status}</p>
			</div>
		</div>
	);
}
