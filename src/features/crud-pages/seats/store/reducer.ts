import { ISeatState, SeatsAction, SeatsActionTypes } from "../store/types";

const initialState: ISeatState = {
    seats: []
};

export const seatReducer = (state = initialState, action: SeatsAction): ISeatState => {
    switch (action.type) {
        case SeatsActionTypes.GET_SEATS:
            return {
                ...state,
                seats: action.payload
            }
        case SeatsActionTypes.ADD_SEAT:
            return {
                ...state,
                seats: [...state.seats, action.payload]
            }
        case SeatsActionTypes.UPDATE_SEAT:
            return {
                ...state,
                seats: state.seats.map(seat => seat.id === action.payload.id ? action.payload : seat)
            }
        case SeatsActionTypes.DELETE_SEAT:
            return {
                ...state,
                seats: state.seats.filter(seat => seat.id !== action.payload.id)
            }
        default:
            return state
    }
}