import { DetailSessionActions, DetailSessionActionTypes, IDetailSessionState } from "./types";

const initialState: IDetailSessionState = {
    session: null
};

export const detailSessionReducer = (state = initialState, action: DetailSessionActions): IDetailSessionState => {
    switch (action.type) {
        case DetailSessionActionTypes.GET_DETAIL_SESSION:
            return {
                ...state,
                session: action.payload
            }
        case DetailSessionActionTypes.CLEAR:
            return {
                ...state,
                session: null
            }
        case DetailSessionActionTypes.CREATE_PURCHASE_HISTORY:
            return {
                ...state,
                session: state.session && {
                    ...state.session,
                    histories: [...(state.session.histories || []), action.payload],
                }
            };
        default:
            return state
    }
}