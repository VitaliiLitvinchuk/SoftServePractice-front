import { IMovie } from "../../movies/store/types"
import { IUser } from "../../users/store/types"

export enum MoviesRatingsActionTypes {
    GET_MOVIES_RATINGS = "GET_MOVIE_RATINGS",
    ADD_MOVIE_RATING = "ADD_MOVIE_RATING",
    UPDATE_MOVIE_RATING = "UPDATE_MOVIE_RATING",
    DELETE_MOVIE_RATING = "DELETE_MOVIE_RATING"
}

export interface IMovieRating {
    movieId: string
    userId: string
    rate: string

    movie?: IMovie
    user?: IUser
}

export interface IMovieRatingWorker {
    [key: string]: string

    movieId: string
    userId: string
    rate: string
}

export interface IMoviesRatingsState {
    moviesRatings: IMovieRating[];
}

export interface IGetMoviesRatingsAction {
    type: MoviesRatingsActionTypes.GET_MOVIES_RATINGS;
    payload: IMovieRating[];
}

export interface IAddMovieRatingAction {
    type: MoviesRatingsActionTypes.ADD_MOVIE_RATING;
    payload: IMovieRating;
}

export interface IUpdateMovieRatingAction {
    type: MoviesRatingsActionTypes.UPDATE_MOVIE_RATING;
    payload: IMovieRating;
}

export interface IDeleteMovieRatingAction {
    type: MoviesRatingsActionTypes.DELETE_MOVIE_RATING;
    payload: IMovieRating;
}

export type MoviesRatingsAction = IGetMoviesRatingsAction | IAddMovieRatingAction | IUpdateMovieRatingAction | IDeleteMovieRatingAction;