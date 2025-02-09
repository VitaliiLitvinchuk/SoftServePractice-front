import { IMovie } from "../../movies/store/types"
import { ITag } from "../../tags/store/types"

export enum MoviesTagsActionTypes {
    GET_MOVIES_TAGS = "GET_MOVIES_TAGS",
    ADD_MOVIE_TAG = "ADD_MOVIE_TAG",
    DELETE_MOVIE_TAG = "DELETE_MOVIE_TAG",
}

export interface IMovieTag {
    movieId: string
    tagId: string

    movie?: IMovie
    tag?: ITag
}

export interface ICreateMovieTag {
    [key: string]: string
    movieId: string
    tagId: string
}

export interface IMoviesTagsState {
    moviesTags: IMovieTag[]
}

export interface IAddMoviesTagAction {
    type: MoviesTagsActionTypes.ADD_MOVIE_TAG
    payload: IMovieTag
}

export interface IDeleteMoviesTagAction {
    type: MoviesTagsActionTypes.DELETE_MOVIE_TAG
    payload: IMovieTag
}

export interface IGetMoviesTagsAction {
    type: MoviesTagsActionTypes.GET_MOVIES_TAGS
    payload: IMovieTag[]
}

export type MoviesTagsAction = IAddMoviesTagAction | IDeleteMoviesTagAction | IGetMoviesTagsAction;