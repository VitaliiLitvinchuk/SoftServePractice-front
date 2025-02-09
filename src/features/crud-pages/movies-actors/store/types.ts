import { IMovie } from "../../movies/store/types"
import { IActor } from "../../actors/store/types"

export enum MoviesActorsActionTypes {
    GET_MOVIES_ACTORS = "GET_MOVIES_ACTORS",
    ADD_MOVIE_ACTOR = "ADD_MOVIE_ACTOR",
    DELETE_MOVIE_ACTOR = "DELETE_MOVIE_ACTOR",
}

export interface IMovieActor {
    movieId: string
    actorId: string

    movie?: IMovie
    actor?: IActor
}

export interface ICreateMovieActor {
    [key: string]: string
    movieId: string
    actorId: string
}

export interface IMoviesActorsState {
    moviesActors: IMovieActor[]
}

export interface IAddMoviesActorAction {
    type: MoviesActorsActionTypes.ADD_MOVIE_ACTOR
    payload: IMovieActor
}

export interface IDeleteMoviesActorAction {
    type: MoviesActorsActionTypes.DELETE_MOVIE_ACTOR
    payload: IMovieActor
}

export interface IGetMoviesActorsAction {
    type: MoviesActorsActionTypes.GET_MOVIES_ACTORS
    payload: IMovieActor[]
}

export type MoviesActorsAction = IAddMoviesActorAction | IDeleteMoviesActorAction | IGetMoviesActorsAction;