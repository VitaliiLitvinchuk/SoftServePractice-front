import { DetailMovieActions, DetailMovieActionTypes, IDetailMovieState } from "./types";

const initialState: IDetailMovieState = {
    movie: null
};

export const detailMovieReducer = (state = initialState, action: DetailMovieActions): IDetailMovieState => {
    switch (action.type) {
        case DetailMovieActionTypes.GET_DETAIL_MOVIE:
            return {
                ...state,
                movie: action.payload
            }
        case DetailMovieActionTypes.CLEAR:
            return {
                ...state,
                movie: null
            }
        default:
            return state
    }
}