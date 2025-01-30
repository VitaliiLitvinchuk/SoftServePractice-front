import rolesAccess from "../../../utils/roles/roles-access";

export enum SignActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

export interface ILogin {
    email: string
    password: string
}

export interface ICreateUser {
    email: string
    password: string
    confirmPassword: string
}

export interface ITokenUser {
    userId: string
    email: string
    roleId: string
    exp: number
    iss: string
    aud: string
}

export interface ILoginUser {
    userId: string
    email: string
    roleId: string
    role: typeof rolesAccess[keyof typeof rolesAccess]
}

export interface ISignState {
    userId: string
    email: string
    roleId: string
    role: typeof rolesAccess[keyof typeof rolesAccess]
    isLoggined: boolean
}

export interface ILoginAction {
    type: SignActionTypes.LOGIN
    payload: ILoginUser
}

export interface ILogoutAction {
    type: SignActionTypes.LOGOUT
}

export type SignAction = ILoginAction | ILogoutAction;