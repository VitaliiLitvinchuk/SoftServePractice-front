import { IHall } from "../../halls/store/types"
import { IMovie } from "../../movies/store/types"
import { IStatus } from "../../statuses/store/types"

export enum SessionsActionTypes {
    GET_SESSIONS = "GET_SESSIONS",
    ADD_SESSION = "ADD_SESSION",
    UPDATE_SESSION = "UPDATE_SESSION",
    DELETE_SESSION = "DELETE_SESSION"
}

export interface ISession {
    id: string
    statusId: string
    movieId: string
    hallId: string
    startAt: string
    endAt: string

    status?: IStatus
    movie?: IMovie
    hall?: IHall
}

export interface ISessionWorker {
    [key: string]: string
    id: string
    statusId: string
    movieId: string
    hallId: string
    startAt: string
    endAt: string
}

export interface ISessionState {
    sessions: ISession[]
}

export interface IGetSessionsAction {
    type: SessionsActionTypes.GET_SESSIONS
    payload: ISession[]
}

export interface IAddSessionAction {
    type: SessionsActionTypes.ADD_SESSION
    payload: ISession
}

export interface IUpdateSessionAction {
    type: SessionsActionTypes.UPDATE_SESSION
    payload: ISession
}

export interface IDeleteSessionAction {
    type: SessionsActionTypes.DELETE_SESSION
    payload: ISession
}

export type SessionsAction = IGetSessionsAction | IAddSessionAction | IUpdateSessionAction | IDeleteSessionAction