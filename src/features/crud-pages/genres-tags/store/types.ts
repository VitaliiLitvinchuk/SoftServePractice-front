import { IGenre } from "../../genres/store/types"
import { ITag } from "../../tags/store/types"

export enum GenresTagsActionTypes {
    GET_GENRES_TAGS = "GET_GENRES_TAGS",
    ADD_GENRE_TAG = "ADD_GENRE_TAG",
    DELETE_GENRE_TAG = "DELETE_GENRE_TAG",
}

export interface IGenreTag {
    genreId: string
    tagId: string

    genre?: IGenre
    tag?: ITag
}

export interface ICreateGenreTag {
    [key: string]: string
    genreId: string
    tagId: string
}

export interface IGenresTagsState {
    genresTags: IGenreTag[]
}

export interface IAddGenresTagAction {
    type: GenresTagsActionTypes.ADD_GENRE_TAG
    payload: IGenreTag
}

export interface IDeleteGenresTagAction {
    type: GenresTagsActionTypes.DELETE_GENRE_TAG
    payload: IGenreTag
}

export interface IGetGenresTagsAction {
    type: GenresTagsActionTypes.GET_GENRES_TAGS
    payload: IGenreTag[]
}

export type GenresTagsAction = IAddGenresTagAction | IDeleteGenresTagAction | IGetGenresTagsAction;