import rolesAccess from "../../../utils/roles/roles-access";
import { ISignState, SignAction, SignActionTypes } from './types';

const initialState: ISignState = {
    email: '',
    userId: '',
    roleId: '',
    role: rolesAccess.guest,
    isLoggined: false,
};

export const signReducer = (state = initialState, action: SignAction): ISignState => {
    switch (action.type) {
        case SignActionTypes.LOGIN:
            return {
                ...state,
                ...action.payload,
                isLoggined: true,
            }
        case SignActionTypes.LOGOUT:
            return {
                ...state,
                email: '',
                userId: '',
                role: rolesAccess.guest,
                isLoggined: false,
            }
        default:
            return state
    }
}