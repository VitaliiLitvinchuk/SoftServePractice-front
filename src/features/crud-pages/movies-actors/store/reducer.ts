import { IMoviesActorsState, MoviesActorsAction, MoviesActorsActionTypes } from "./types";

const initialState: IMoviesActorsState = {
    moviesActors: []
}

export const movieActorReducer = (state = initialState, action: MoviesActorsAction): IMoviesActorsState => {
    switch (action.type) {
        case MoviesActorsActionTypes.GET_MOVIES_ACTORS:
            return {
                ...state,
                moviesActors: action.payload
            }
        case MoviesActorsActionTypes.ADD_MOVIE_ACTOR:
            return {
                ...state,
                moviesActors: [...state.moviesActors, action.payload]
            }
        case MoviesActorsActionTypes.DELETE_MOVIE_ACTOR:
            return {
                ...state,
                moviesActors: state.moviesActors.filter(movieActor => !(movieActor.movieId === action.payload.movieId && movieActor.actorId === action.payload.actorId))
            }
        default:
            return state
    }
}