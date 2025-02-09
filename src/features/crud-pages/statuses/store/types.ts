export enum StatusesActionTypes {
    GET_STATUSES = "GET_STATUSES",
    ADD_STATUS = "ADD_STATUS",
    UPDATE_STATUS = "UPDATE_STATUS",
    DELETE_STATUS = "DELETE_STATUS"
}

export interface IStatus {
    [key: string]: string
    id: string;
    name: string;
}

export interface IStatusState {
    statuses: IStatus[];
}

export interface IGetStatussAction {
    type: StatusesActionTypes.GET_STATUSES;
    payload: IStatus[];
}

export interface IAddStatusAction {
    type: StatusesActionTypes.ADD_STATUS;
    payload: IStatus;
}

export interface IUpdateStatusAction {
    type: StatusesActionTypes.UPDATE_STATUS;
    payload: IStatus;
}

export interface IDeleteStatusAction {
    type: StatusesActionTypes.DELETE_STATUS;
    payload: IStatus;
}

export type StatusesAction = IGetStatussAction | IAddStatusAction | IUpdateStatusAction | IDeleteStatusAction;