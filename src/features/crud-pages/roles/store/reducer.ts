import { IRoleState, RolesAction, RolesActionTypes } from "../store/types";

const initialState: IRoleState = {
    roles: []
};

export const roleReducer = (state = initialState, action: RolesAction): IRoleState => {
    switch (action.type) {
        case RolesActionTypes.GET_ROLES:
            return {
                ...state,
                roles: action.payload
            }
        case RolesActionTypes.ADD_ROLE:
            return {
                ...state,
                roles: [...state.roles, action.payload]
            }
        case RolesActionTypes.UPDATE_ROLE:
            return {
                ...state,
                roles: state.roles.map(role => role.id === action.payload.id ? action.payload : role)
            }
        case RolesActionTypes.DELETE_ROLE:
            return {
                ...state,
                roles: state.roles.filter(role => role.id !== action.payload.id)
            }
        default:
            return state
    }
}