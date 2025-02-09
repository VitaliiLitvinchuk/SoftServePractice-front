import { Dispatch } from "redux";
import { ICreateUser, ILogin, ITokenUser, SignAction, SignActionTypes } from "./types";
import { removeTokenFromLocalStorage, setTokenToLocalStorage } from "../../../utils/enviroment/storage/token";
import { http_form } from '../../../utils/http/creator';
import { jwtDecode } from "jwt-decode";
import rolesAccess from "../../../utils/roles/roles-access";
import getRoleById from "../../../utils/roles/get-role-by-id";
import { AxiosError } from "axios";
import errorExtractor from "../../../utils/error/extractor/axios";
import { ILoginError } from "../login";
import { ICreateUserError } from "../register";

const endpoints = {
    create: "users/create",
    login: "users/login",
}

export const loginAction = (user: ILogin, setErrors: (errors: ILoginError) => void) => {
    return async (dispatch: Dispatch<SignAction>) => {
        try {
            const formData = new FormData();

            formData.append("email", user.email);
            formData.append("password", user.password);

            const response = await http_form().post<{ token: string }>(endpoints.login, formData);
            const token = response.data.token;

            await login(token, dispatch);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errors = errorExtractor(error, dispatch);

                if (errors) {
                    setErrors(errors as unknown as ILoginError);
                }
            }
            else {
                throw error;
            }
        }
    }
}

export const createUserAction = (user: ICreateUser, setErrors: (errors: ICreateUserError) => void) => {
    return async (dispatch: Dispatch<SignAction>) => {
        try {
            if (user.password !== user.confirmPassword) {
                setErrors({ email: [], password: ["Passwords do not match"], confirmPassword: ["Passwords do not match"] });
                throw new Error("Passwords do not match");
            }

            const formData = new FormData();

            formData.append("email", user.email);
            formData.append("password", user.password);

            const response = await http_form().post<{ token: string }>(endpoints.create, formData);
            const token = response.data.token;

            await login(token, dispatch);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errors = errorExtractor(error, dispatch);

                if (errors) {
                    setErrors(errors as unknown as ICreateUserError);
                }
            }
            else {
                throw error;
            }
        }
    }
}

const login = async (token: string, dispatch: Dispatch<SignAction>) => {
    if (token) {
        setTokenToLocalStorage(token);
        const decodedUser = jwtDecode<ITokenUser>(token);

        const role = await getRoleById(decodedUser.roleId);

        dispatch({
            type: SignActionTypes.LOGIN,
            payload: {
                email: decodedUser.email,
                userId: decodedUser.userId,
                roleId: role.data.id,
                role: rolesAccess[role.data.name.toLowerCase()] || rolesAccess.guest,
            }
        });
    }
}

export const logoutAction = () => {
    return async (dispatch: Dispatch<SignAction>) => {
        removeTokenFromLocalStorage();

        dispatch({ type: SignActionTypes.LOGOUT });
    }
}