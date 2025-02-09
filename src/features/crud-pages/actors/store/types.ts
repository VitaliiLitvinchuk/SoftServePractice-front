export enum ActorsActionTypes {
    GET_ACTORS = "GET_ACTORS",
    ADD_ACTOR = "ADD_ACTOR",
    UPDATE_ACTOR = "UPDATE_ACTOR",
    DELETE_ACTOR = "DELETE_ACTOR"
}

export interface IActor {
    [key: string]: string
    id: string;
    name: string;
    surname: string;
    middlename: string;
    imageUrl: string;
}

export interface IActorWorker {
    [key: string]: string | File | null;
    id: string;
    name: string;
    surname: string;
    middlename: string;
    image: File | null;
}

export interface IActorState {
    actors: IActor[];
}

export interface IGetActorsAction {
    type: ActorsActionTypes.GET_ACTORS;
    payload: IActor[];
}

export interface IAddActorAction {
    type: ActorsActionTypes.ADD_ACTOR;
    payload: IActor;
}

export interface IUpdateActorAction {
    type: ActorsActionTypes.UPDATE_ACTOR;
    payload: IActor;
}

export interface IDeleteActorAction {
    type: ActorsActionTypes.DELETE_ACTOR;
    payload: IActor;
}

export type ActorsAction = IGetActorsAction | IAddActorAction | IUpdateActorAction | IDeleteActorAction;