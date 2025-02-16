import { DetailHallActions, DetailHallActionTypes, IDetailHallState } from "./types";

const initialState: IDetailHallState = {
    hall: null
};

export const detailHallReducer = (state = initialState, action: DetailHallActions): IDetailHallState => {
    switch (action.type) {
        case DetailHallActionTypes.GET_DETAIL_HALL:
            return {
                ...state,
                hall: action.payload
            }
        case DetailHallActionTypes.CLEAR:
            return {
                ...state,
                hall: null
            }
        default:
            return state
    }
}