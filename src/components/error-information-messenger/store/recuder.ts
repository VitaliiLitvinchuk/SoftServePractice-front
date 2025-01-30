import { InformationMessengersAction, InformationMessengerActionTypes, InformationMessengersState as InformationMessengersState } from './types';

const initialState: InformationMessengersState = {
    showInformationMessenger: false,
    message: "",
}

export const informationMessengerReducer = (state = initialState, action: InformationMessengersAction): InformationMessengersState => {
    switch (action.type) {
        case InformationMessengerActionTypes.SHOW_INFORMATION_MESSENGER:
            return {
                ...state,
                ...action.payload,
                showInformationMessenger: true,
            }
        case InformationMessengerActionTypes.CLOSE_INFORMATION_MESSENGER:
            return {
                ...state,
                showInformationMessenger: false,
                message: "",
            }
        default:
            return state
    }
}