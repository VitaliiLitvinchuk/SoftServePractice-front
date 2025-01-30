import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from "../store/creators";

export const useActions = <T extends keyof typeof ActionCreators>(reducerKey: T) => {
    const dispatch = useDispatch();

    const actions = ActionCreators[reducerKey];

    return bindActionCreators(actions, dispatch) as typeof actions;
};