import { IMoviesGenresState, MoviesGenresAction, MoviesGenresActionTypes } from "./types";

const initialState: IMoviesGenresState = {
    moviesGenres: []
}

export const movieGenreReducer = (state = initialState, action: MoviesGenresAction): IMoviesGenresState => {
    switch (action.type) {
        case MoviesGenresActionTypes.GET_MOVIES_GENRES:
            return {
                ...state,
                moviesGenres: action.payload
            }
        case MoviesGenresActionTypes.ADD_MOVIE_GENRE:
            return {
                ...state,
                moviesGenres: [...state.moviesGenres, action.payload]
            }
        case MoviesGenresActionTypes.DELETE_MOVIE_GENRE:
            return {
                ...state,
                moviesGenres: state.moviesGenres.filter(movieGenre => !(movieGenre.movieId === action.payload.movieId && movieGenre.genreId === action.payload.genreId))
            }
        default:
            return state
    }
}