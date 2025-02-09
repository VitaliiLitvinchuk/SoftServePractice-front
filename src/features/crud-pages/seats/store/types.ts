import { IHall } from "../../halls/store/types"

export enum SeatsActionTypes {
    GET_SEATS = "GET_SEATS",
    ADD_SEAT = "ADD_SEAT",
    UPDATE_SEAT = "UPDATE_SEAT",
    DELETE_SEAT = "DELETE_SEAT"
}

export interface ISeat {
    id: string
    row: string
    number: string
    hallId: string
    hall?: IHall
}

export interface ISeatWorker {
    [key: string]: string
    id: string
    row: string
    number: string
    hallId: string
}

export interface ISeatState {
    seats: ISeat[]
}

export interface IGetSeatsAction {
    type: SeatsActionTypes.GET_SEATS
    payload: ISeat[]
}

export interface IAddSeatAction {
    type: SeatsActionTypes.ADD_SEAT
    payload: ISeat
}

export interface IUpdateSeatAction {
    type: SeatsActionTypes.UPDATE_SEAT
    payload: ISeat
}

export interface IDeleteSeatAction {
    type: SeatsActionTypes.DELETE_SEAT
    payload: ISeat
}

export type SeatsAction = IGetSeatsAction | IAddSeatAction | IUpdateSeatAction | IDeleteSeatAction;