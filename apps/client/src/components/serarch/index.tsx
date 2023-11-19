import { UserPreview } from "../userPreview";
import "./search.css";
import { useAppSelector } from "../../hooks/use-app-selector";
import { actions } from "../../redux/search";
import { LoadingState } from "../../types&constants";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";

export function Serach() {
	const { online, data, state, search } = useAppSelector(
		(state) => state.search
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(actions.findUsersByName());
	}, [online, search]);

	useEffect(() => {
		actions.findUsersByName();
	}, []);

	const data_map = {
		[LoadingState.Fulfilled]: () =>
			data.map((user: any) => <UserPreview key={user.id} user={user} />),
		[LoadingState.Pending]: () => "Loading...",
		[LoadingState.Rejected]: () => "Error.",
		[LoadingState.Idle]: () => "",
	};

	return (
		<div className="search-container">
			<div className="tabs-container">
				<button
					className={online ? "active" : ""}
					onClick={() => dispatch(actions.setOnline(true))}
				>
					Online
				</button>
				<button
					className={online ? "" : "active"}
					onClick={() => dispatch(actions.setOnline(false))}
				>
					All
				</button>
			</div>
			<div className="users-container">{data_map[state]()}</div>
			<div className="search-input">
				<input
					placeholder="Search..."
					type="text"
					onChange={(v) => dispatch(actions.setSearch(v.target.value))}
				></input>
			</div>
		</div>
	);
}
