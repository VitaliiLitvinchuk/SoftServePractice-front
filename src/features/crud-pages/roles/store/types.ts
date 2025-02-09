export enum RolesActionTypes {
    GET_ROLES = "GET_ROLES",
    ADD_ROLE = "ADD_ROLE",
    UPDATE_ROLE = "UPDATE_ROLE",
    DELETE_ROLE = "DELETE_ROLE"
}

export interface IRole {
    [key: string]: string
    id: string;
    name: string;
}

export interface IRoleState {
    roles: IRole[];
}

export interface IGetRolesAction {
    type: RolesActionTypes.GET_ROLES;
    payload: IRole[];
}

export interface IAddRoleAction {
    type: RolesActionTypes.ADD_ROLE;
    payload: IRole;
}

export interface IUpdateRoleAction {
    type: RolesActionTypes.UPDATE_ROLE;
    payload: IRole;
}

export interface IDeleteRoleAction {
    type: RolesActionTypes.DELETE_ROLE;
    payload: IRole;
}

export type RolesAction = IGetRolesAction | IAddRoleAction | IUpdateRoleAction | IDeleteRoleAction;