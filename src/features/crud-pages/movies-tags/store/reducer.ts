import { IMoviesTagsState, MoviesTagsAction, MoviesTagsActionTypes } from "./types";

const initialState: IMoviesTagsState = {
    moviesTags: []
}

export const movieTagReducer = (state = initialState, action: MoviesTagsAction): IMoviesTagsState => {
    switch (action.type) {
        case MoviesTagsActionTypes.GET_MOVIES_TAGS:
            return {
                ...state,
                moviesTags: action.payload
            }
        case MoviesTagsActionTypes.ADD_MOVIE_TAG:
            return {
                ...state,
                moviesTags: [...state.moviesTags, action.payload]
            }
        case MoviesTagsActionTypes.DELETE_MOVIE_TAG:
            return {
                ...state,
                moviesTags: state.moviesTags.filter(movieTag => !(movieTag.movieId === action.payload.movieId && movieTag.tagId === action.payload.tagId))
            }
        default:
            return state
    }
}