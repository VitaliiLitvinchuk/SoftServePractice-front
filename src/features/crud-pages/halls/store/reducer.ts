import { IHallState, HallsAction, HallsActionTypes } from "../store/types";

const initialState: IHallState = {
    halls: []
};

export const hallReducer = (state = initialState, action: HallsAction): IHallState => {
    switch (action.type) {
        case HallsActionTypes.GET_HALLS:
            return {
                ...state,
                halls: action.payload
            }
        case HallsActionTypes.ADD_HALL:
            return {
                ...state,
                halls: [...state.halls, action.payload]
            }
        case HallsActionTypes.UPDATE_HALL:
            return {
                ...state,
                halls: state.halls.map(hall => hall.id === action.payload.id ? action.payload : hall)
            }
        case HallsActionTypes.DELETE_HALL:
            return {
                ...state,
                halls: state.halls.filter(hall => hall.id !== action.payload.id)
            }
        default:
            return state
    }
}