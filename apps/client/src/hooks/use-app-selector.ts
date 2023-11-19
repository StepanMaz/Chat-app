import { useSelector } from "react-redux";
import { StoreState } from "../redux/store";

export const useAppSelector: <TSelected>(
	selector: (state: StoreState) => TSelected
) => TSelected = useSelector;
