export enum MoviesActionTypes {
    GET_MOVIES = "GET_MOVIES",
    ADD_MOVIE = "ADD_MOVIE",
    UPDATE_MOVIE = "UPDATE_MOVIE",
    DELETE_MOVIE = "DELETE_MOVIE"
}

export interface IMovie {
    [key: string]: string
    id: string;
    name: string;
    duration: string;
    trailerUrl: string;
    imageUrl: string;
    description: string;
    releaseDate: string;
}

export interface IMovieWorker {
    [key: string]: string | File | null;
    id: string;
    name: string;
    duration: string;
    trailerUrl: string;
    image: File | null;
    description: string;
    releaseDate: string;
}

export interface IMovieState {
    movies: IMovie[];
}

export interface IGetMoviesAction {
    type: MoviesActionTypes.GET_MOVIES;
    payload: IMovie[];
}

export interface IAddMovieAction {
    type: MoviesActionTypes.ADD_MOVIE;
    payload: IMovie;
}

export interface IUpdateMovieAction {
    type: MoviesActionTypes.UPDATE_MOVIE;
    payload: IMovie;
}

export interface IDeleteMovieAction {
    type: MoviesActionTypes.DELETE_MOVIE;
    payload: IMovie;
}

export type MoviesAction = IGetMoviesAction | IAddMovieAction | IUpdateMovieAction | IDeleteMovieAction;