import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { IRole, RolesAction, RolesActionTypes } from "./types";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import { IRoleErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";

const endpoints = {
    get: "/roles/get-all",
    add: "/roles/create",
    update: "/roles/update",
    delete: "/roles/delete"
}

export const getRoles = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<RolesAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: RolesActionTypes.GET_ROLES, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addRole = (role: IRole, setError: React.Dispatch<SetStateAction<IRoleErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<RolesAction>) => {
        try {
            const data = new FormData();

            data.append("name", role.name);

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: RolesActionTypes.ADD_ROLE, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else if (error instanceof AxiosError) {
                const errors = errorExtractor(error, dispatch);

                if (errors) {
                    setError(errorNormalizer(errors));
                }
            }
            else
                console.log(error);
        }
    };
}

export const updateRole = (role: IRole, setError: React.Dispatch<SetStateAction<IRoleErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<RolesAction>) => {
        try {
            const data = new FormData();

            Object.keys(role).forEach(key => data.append(key, role[key]));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: RolesActionTypes.UPDATE_ROLE, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else if (error instanceof AxiosError) {
                const errors = errorExtractor(error, dispatch);

                if (errors) {
                    setError(errorNormalizer(errors));
                }
            }
            else
                console.log(error);
        }
    };
}

export const deleteRole = (id: string, setError: React.Dispatch<SetStateAction<IRoleErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<RolesAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: RolesActionTypes.DELETE_ROLE, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else if (error instanceof AxiosError) {
                const errors = errorExtractor(error, dispatch);

                if (errors) {
                    setError(errorNormalizer(errors));
                }
            }
            else
                console.log(error);
        }
    }
}