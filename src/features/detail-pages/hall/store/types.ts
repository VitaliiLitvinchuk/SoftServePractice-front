import { ISeat } from "../../../crud-pages/seats/store/types";

export enum DetailHallActionTypes {
    GET_DETAIL_HALL = "GET_DETAIL_HALL",
    CLEAR = "CLEAR"
}

export interface IDetailHall {
    id: string;
    name: string;
    capacity: string;
    seats: ISeat[]
}

export interface IDetailHallState {
    hall: IDetailHall | null
}

export interface IGetDetailHallAction {
    type: DetailHallActionTypes.GET_DETAIL_HALL
    payload: IDetailHall
}

export interface IClearDetailHallAction {
    type: DetailHallActionTypes.CLEAR
}

export type DetailHallActions = IGetDetailHallAction | IClearDetailHallAction;