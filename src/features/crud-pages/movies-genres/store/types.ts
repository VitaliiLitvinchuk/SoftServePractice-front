import { IMovie } from "../../movies/store/types"
import { IGenre } from "../../genres/store/types"

export enum MoviesGenresActionTypes {
    GET_MOVIES_GENRES = "GET_MOVIES_GENRES",
    ADD_MOVIE_GENRE = "ADD_MOVIE_GENRE",
    DELETE_MOVIE_GENRE = "DELETE_MOVIE_GENRE",
}

export interface IMovieGenre {
    movieId: string
    genreId: string

    movie?: IMovie
    genre?: IGenre
}

export interface ICreateMovieGenre {
    [key: string]: string
    movieId: string
    genreId: string
}

export interface IMoviesGenresState {
    moviesGenres: IMovieGenre[]
}

export interface IAddMoviesGenreAction {
    type: MoviesGenresActionTypes.ADD_MOVIE_GENRE
    payload: IMovieGenre
}

export interface IDeleteMoviesGenreAction {
    type: MoviesGenresActionTypes.DELETE_MOVIE_GENRE
    payload: IMovieGenre
}

export interface IGetMoviesGenresAction {
    type: MoviesGenresActionTypes.GET_MOVIES_GENRES
    payload: IMovieGenre[]
}

export type MoviesGenresAction = IAddMoviesGenreAction | IDeleteMoviesGenreAction | IGetMoviesGenresAction;