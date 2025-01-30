import { Dispatch } from "redux";
import { InformationMessengerActionTypes, InformationMessengersAction } from "./types";

export const showInformationMessenger = (message: string, backgroundColor: string = "white") => {
    return async (dispatch: Dispatch<InformationMessengersAction>) => {
        dispatch({ type: InformationMessengerActionTypes.SHOW_INFORMATION_MESSENGER, payload: { message, backgroundColor } })
    }
}

export const closeInformationMessenger = () => {
    return async (dispatch: Dispatch<InformationMessengersAction>) => {
        dispatch({ type: InformationMessengerActionTypes.CLOSE_INFORMATION_MESSENGER })
    }
}