import { IMovie } from '../../crud-pages/movies/store/types';

export enum HomeActionTypes {
    GET_HOME_MOVIES = "GET_HOME_MOVIES",
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IHomeMovie extends IMovie {

};

export interface IHomeState {
    homeMovies: IHomeMovie[];
}

export interface IGetHomeMoviesAction {
    type: HomeActionTypes.GET_HOME_MOVIES;
    payload: IHomeMovie[];
}

export type HomeActions = IGetHomeMoviesAction;