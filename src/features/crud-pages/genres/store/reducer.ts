import { IGenreState, GenresAction, GenresActionTypes } from "../store/types";

const initialState: IGenreState = {
    genres: []
};

export const genreReducer = (state = initialState, action: GenresAction): IGenreState => {
    switch (action.type) {
        case GenresActionTypes.GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GenresActionTypes.ADD_GENRE:
            return {
                ...state,
                genres: [...state.genres, action.payload]
            }
        case GenresActionTypes.UPDATE_GENRE:
            return {
                ...state,
                genres: state.genres.map(genre => genre.id === action.payload.id ? action.payload : genre)
            }
        case GenresActionTypes.DELETE_GENRE:
            return {
                ...state,
                genres: state.genres.filter(genre => genre.id !== action.payload.id)
            }
        default:
            return state
    }
}