import { IPurchaseHistory } from '../../../crud-pages/purchase-histories/store/types';
import { ISeat } from '../../../crud-pages/seats/store/types';
import { ISession } from '../../../crud-pages/sessions/store/types';
import { ITicket } from '../../../crud-pages/tickets/store/types';

export enum DetailSessionActionTypes {
    GET_DETAIL_SESSION = "GET_DETAIL_SESSION",
    CREATE_PURCHASE_HISTORY = "CREATE_PURCHASE_HISTORY",
    CLEAR = "CLEAR"
}

export interface IDetailSession extends ISession {
    tickets: ITicket[]
    seats: ISeat[]
    histories: IPurchaseHistory[]
}

export interface IDetailSessionState {
    session: IDetailSession | null
}

export interface IGetDetailSessionAction {
    type: DetailSessionActionTypes.GET_DETAIL_SESSION
    payload: IDetailSession
}

export interface ICreatePurchaseHistoryAction {
    type: DetailSessionActionTypes.CREATE_PURCHASE_HISTORY
    payload: IPurchaseHistory
}

export interface IClearDetailSessionAction {
    type: DetailSessionActionTypes.CLEAR
}

export type DetailSessionActions = IGetDetailSessionAction | IClearDetailSessionAction | ICreatePurchaseHistoryAction;