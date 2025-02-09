import { IRole } from "../../roles/store/types"

export enum UsersActionTypes {
    GET_USERS = "GET_USERS",
    UPDATE_USER = "UPDATE_USER",
    DELETE_USER = "DELETE_USER"
}

export interface IUser {
    id: string
    email: string
    roleId: string
    role?: IRole
}

export interface IUserWorker {
    [key: string]: string
    id: string
    roleId: string
}

export interface IUserState {
    users: IUser[]
}

export interface IGetUsersAction {
    type: UsersActionTypes.GET_USERS
    payload: IUser[]
}

export interface IUpdateUserAction {
    type: UsersActionTypes.UPDATE_USER
    payload: IUser
}

export interface IDeleteUserAction {
    type: UsersActionTypes.DELETE_USER
    payload: IUser
}

export type UsersAction = IGetUsersAction | IUpdateUserAction | IDeleteUserAction;