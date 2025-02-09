export enum HallsActionTypes {
    GET_HALLS = "GET_HALLS",
    ADD_HALL = "ADD_HALL",
    UPDATE_HALL = "UPDATE_HALL",
    DELETE_HALL = "DELETE_HALL"
}

export interface IHall {
    [key: string]: string;
    id: string;
    name: string;
    capacity: string;
}

export interface IHallState {
    halls: IHall[];
}

export interface IGetHallsAction {
    type: HallsActionTypes.GET_HALLS;
    payload: IHall[];
}

export interface IAddHallAction {
    type: HallsActionTypes.ADD_HALL;
    payload: IHall;
}

export interface IUpdateHallAction {
    type: HallsActionTypes.UPDATE_HALL;
    payload: IHall;
}

export interface IDeleteHallAction {
    type: HallsActionTypes.DELETE_HALL;
    payload: IHall;
}

export type HallsAction = IGetHallsAction | IAddHallAction | IUpdateHallAction | IDeleteHallAction;