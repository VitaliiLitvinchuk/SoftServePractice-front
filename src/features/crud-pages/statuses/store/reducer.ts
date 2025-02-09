import { IStatusState, StatusesAction, StatusesActionTypes } from "./types";

const initialState: IStatusState = {
    statuses: []
};

export const statusReducer = (state = initialState, action: StatusesAction): IStatusState => {
    switch (action.type) {
        case StatusesActionTypes.GET_STATUSES:
            return {
                ...state,
                statuses: action.payload
            }
        case StatusesActionTypes.ADD_STATUS:
            return {
                ...state,
                statuses: [...state.statuses, action.payload]
            }
        case StatusesActionTypes.UPDATE_STATUS:
            return {
                ...state,
                statuses: state.statuses.map(statu => statu.id === action.payload.id ? action.payload : statu)
            }
        case StatusesActionTypes.DELETE_STATUS:
            return {
                ...state,
                statuses: state.statuses.filter(statu => statu.id !== action.payload.id)
            }
        default:
            return state
    }
}