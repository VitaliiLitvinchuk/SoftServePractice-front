import { IGenresTagsState, GenresTagsAction, GenresTagsActionTypes } from "./types";

const initialState: IGenresTagsState = {
    genresTags: []
}

export const genreTagReducer = (state = initialState, action: GenresTagsAction): IGenresTagsState => {
    switch (action.type) {
        case GenresTagsActionTypes.GET_GENRES_TAGS:
            return {
                ...state,
                genresTags: action.payload
            }
        case GenresTagsActionTypes.ADD_GENRE_TAG:
            return {
                ...state,
                genresTags: [...state.genresTags, action.payload]
            }
        case GenresTagsActionTypes.DELETE_GENRE_TAG:
            return {
                ...state,
                genresTags: state.genresTags.filter(genreTag => !(genreTag.genreId === action.payload.genreId && genreTag.tagId === action.payload.tagId))
            }
        default:
            return state
    }
}