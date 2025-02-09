import { IMoviesRatingsState, MoviesRatingsAction, MoviesRatingsActionTypes } from "./types";

const initialState: IMoviesRatingsState = {
    moviesRatings: []
}

export const movieRatingReducer = (state = initialState, action: MoviesRatingsAction): IMoviesRatingsState => {
    switch (action.type) {
        case MoviesRatingsActionTypes.GET_MOVIES_RATINGS:
            return {
                ...state,
                moviesRatings: action.payload
            }
        case MoviesRatingsActionTypes.ADD_MOVIE_RATING:
            return {
                ...state,
                moviesRatings: [...state.moviesRatings, action.payload]
            }
        case MoviesRatingsActionTypes.UPDATE_MOVIE_RATING:
            return {
                ...state,
                moviesRatings: state.moviesRatings.map(movieRating => movieRating.userId === action.payload.userId && movieRating.movieId === action.payload.movieId ? action.payload : movieRating)
            }
        case MoviesRatingsActionTypes.DELETE_MOVIE_RATING:
            return {
                ...state,
                moviesRatings: state.moviesRatings.filter(movieGenre => !(movieGenre.movieId === action.payload.movieId && movieGenre.userId === action.payload.userId))
            }
        default:
            return state
    }
}