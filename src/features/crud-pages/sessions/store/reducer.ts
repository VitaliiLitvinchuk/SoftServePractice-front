import { ISessionState, SessionsAction, SessionsActionTypes } from "../store/types";

const initialState: ISessionState = {
    sessions: []
};

export const sessionReducer = (state = initialState, action: SessionsAction): ISessionState => {
    switch (action.type) {
        case SessionsActionTypes.GET_SESSIONS:
            return {
                ...state,
                sessions: action.payload
            }
        case SessionsActionTypes.ADD_SESSION:
            return {
                ...state,
                sessions: [...state.sessions, action.payload]
            }
        case SessionsActionTypes.UPDATE_SESSION:
            return {
                ...state,
                sessions: state.sessions.map(session => session.id === action.payload.id ? action.payload : session)
            }
        case SessionsActionTypes.DELETE_SESSION:
            return {
                ...state,
                sessions: state.sessions.filter(session => session.id !== action.payload.id)
            }
        default:
            return state
    }
}