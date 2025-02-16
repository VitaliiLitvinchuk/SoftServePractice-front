import { HomeActions, HomeActionTypes, IHomeState } from "./types";

const initialState: IHomeState = {
    homeMovies: []
};

export const homeReducer = (state = initialState, action: HomeActions): IHomeState => {
    switch (action.type) {
        case HomeActionTypes.GET_HOME_MOVIES:
            return {
                ...state,
                homeMovies: action.payload
            }
        default:
            return state
    }
}