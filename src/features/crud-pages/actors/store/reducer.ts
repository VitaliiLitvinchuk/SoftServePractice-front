import { IActorState, ActorsAction, ActorsActionTypes } from "../store/types";

const initialState: IActorState = {
    actors: []
};

export const actorReducer = (state = initialState, action: ActorsAction): IActorState => {
    switch (action.type) {
        case ActorsActionTypes.GET_ACTORS:
            return {
                ...state,
                actors: action.payload
            }
        case ActorsActionTypes.ADD_ACTOR:
            return {
                ...state,
                actors: [...state.actors, action.payload]
            }
        case ActorsActionTypes.UPDATE_ACTOR:
            return {
                ...state,
                actors: state.actors.map(actor => actor.id === action.payload.id ? action.payload : actor)
            }
        case ActorsActionTypes.DELETE_ACTOR:
            return {
                ...state,
                actors: state.actors.filter(actor => actor.id !== action.payload.id)
            }
        default:
            return state
    }
}