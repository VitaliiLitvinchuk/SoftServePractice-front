import { IMovieState, MoviesAction, MoviesActionTypes } from "../store/types";

const initialState: IMovieState = {
    movies: []
};

export const movieReducer = (state = initialState, action: MoviesAction): IMovieState => {
    switch (action.type) {
        case MoviesActionTypes.GET_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        case MoviesActionTypes.ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies, action.payload]
            }
        case MoviesActionTypes.UPDATE_MOVIE:
            return {
                ...state,
                movies: state.movies.map(movie => movie.id === action.payload.id ? action.payload : movie)
            }
        case MoviesActionTypes.DELETE_MOVIE:
            return {
                ...state,
                movies: state.movies.filter(movie => movie.id !== action.payload.id)
            }
        default:
            return state
    }
}