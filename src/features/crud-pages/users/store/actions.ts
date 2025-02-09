import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { UsersAction, UsersActionTypes, IUserWorker } from "./types";
import React, { SetStateAction } from "react";
import { IUserErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";
import errorExtractor from "../../../../utils/error/extractor/axios";

const endpoints = {
    get: "/users/get-all",
    add: "/users/create",
    update: "/users/update",
    delete: "/users/delete"
}

export const getUsers = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            const response = await bearer_json(cancelToken).get(endpoints.get);

            dispatch({ type: UsersActionTypes.GET_USERS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const updateUser = (user: IUserWorker, setError: React.Dispatch<SetStateAction<IUserErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            const data = new FormData();

            Object.keys(user).forEach(key => data.append(key, user[key] || ""));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: UsersActionTypes.UPDATE_USER, payload: response.data });
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

export const deleteUser = (id: string, setError: React.Dispatch<SetStateAction<IUserErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: UsersActionTypes.DELETE_USER, payload: response.data });
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