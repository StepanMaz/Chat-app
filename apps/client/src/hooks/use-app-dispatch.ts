import { useDispatch } from "react-redux";
import { store } from "../redux/store";

export const useAppDispatch: () => typeof store.instance.dispatch = useDispatch;
