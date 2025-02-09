import { ISeat } from "../../seats/store/types"
import { ISession } from "../../sessions/store/types"

export enum TicketsActionTypes {
    GET_TICKETS = "GET_TICKETS",
    ADD_TICKET = "ADD_TICKET",
    UPDATE_TICKET = "UPDATE_TICKET",
    DELETE_TICKET = "DELETE_TICKET"
}

export interface ITicket {
    id: string
    sessionId: string
    seatId: string
    price: string

    session?: ISession
    seat?: ISeat
}

export interface ITicketWorker {
    [key: string]: string
    id: string
    sessionId: string
    seatId: string
    price: string
}

export interface ITicketState {
    tickets: ITicket[]
}

export interface IGetTicketsAction {
    type: TicketsActionTypes.GET_TICKETS
    payload: ITicket[]
}

export interface IAddTicketAction {
    type: TicketsActionTypes.ADD_TICKET
    payload: ITicket
}

export interface IUpdateTicketAction {
    type: TicketsActionTypes.UPDATE_TICKET
    payload: ITicket
}

export interface IDeleteTicketAction {
    type: TicketsActionTypes.DELETE_TICKET
    payload: ITicket
}

export type TicketsAction = IGetTicketsAction | IAddTicketAction | IUpdateTicketAction | IDeleteTicketAction