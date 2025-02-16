import { IActor } from '../../../crud-pages/actors/store/types';
import { IGenre } from '../../../crud-pages/genres/store/types';
import { IMovieRating } from '../../../crud-pages/movies-rating/store/types';
import { IMovie } from '../../../crud-pages/movies/store/types';
import { ISession } from '../../../crud-pages/sessions/store/types';
import { ITag } from '../../../crud-pages/tags/store/types';

export enum DetailMovieActionTypes {
    GET_DETAIL_MOVIE = "GET_DETAIL_MOVIE",
    CLEAR = "CLEAR"
}

export interface IDetailMovie extends IMovie {
    genres: IGenre[] | null
    tags: ITag[] | null
    actors: IActor[] | null
    sessions: ISession[] | null
    ratings: IMovieRating[] | null
}

export interface IDetailMovieState {
    movie: IDetailMovie | null
}

export interface IGetDetailMovieAction {
    type: DetailMovieActionTypes.GET_DETAIL_MOVIE
    payload: IDetailMovie
}

export interface IClearDetailMovieAction {
    type: DetailMovieActionTypes.CLEAR
}

export type DetailMovieActions = IGetDetailMovieAction | IClearDetailMovieAction;