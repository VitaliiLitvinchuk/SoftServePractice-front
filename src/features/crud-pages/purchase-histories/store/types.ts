import { ITicket } from "../../tickets/store/types"
import { IUser } from "../../users/store/types"

export enum PurchaseHistoriesActionTypes {
    GET_HISTORIES = "GET_HISTORIES",
    ADD_HISTORY = "ADD_HISTORY",
    DELETE_HISTORY = "DELETE_HISTORY"
}

export interface IPurchaseHistory {
    id: string
    userId: string
    ticketId: string
    purchasedAt: string

    user?: IUser
    ticket?: ITicket
}

export interface IPurchaseHistoriesWorker {
    [key: string]: string
    id: string
    userId: string
    ticketId: string
    purchasedAt: string
}

export interface IPurchaseHistoryState {
    histories: IPurchaseHistory[]
}

export interface IGetPurchaseHistoriesAction {
    type: PurchaseHistoriesActionTypes.GET_HISTORIES
    payload: IPurchaseHistory[]
}

export interface IAddPurchaseHistoryAction {
    type: PurchaseHistoriesActionTypes.ADD_HISTORY
    payload: IPurchaseHistory
}


export interface IDeletePurchaseHistoryAction {
    type: PurchaseHistoriesActionTypes.DELETE_HISTORY
    payload: IPurchaseHistory
}

export type PurchaseHistoriesAction = IGetPurchaseHistoriesAction | IAddPurchaseHistoryAction | IDeletePurchaseHistoryAction;