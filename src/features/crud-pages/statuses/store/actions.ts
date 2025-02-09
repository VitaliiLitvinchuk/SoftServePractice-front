import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import errorNormalizer from "../../../../utils/error/normalizer";
import { IStatus, StatusesAction, StatusesActionTypes } from "./types";
import { IStatusErrorType } from "../modal-form";

const endpoints = {
    get: "/statuses/get-all",
    add: "/statuses/create",
    update: "/statuses/update",
    delete: "/statuses/delete"
}

export const getStatuses = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<StatusesAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: StatusesActionTypes.GET_STATUSES, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addStatus = (status: IStatus, setError: React.Dispatch<SetStateAction<IStatusErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<StatusesAction>) => {
        try {
            const data = new FormData();

            data.append("name", status.name);

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: StatusesActionTypes.ADD_STATUS, payload: response.data });
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

export const updateStatus = (status: IStatus, setError: React.Dispatch<SetStateAction<IStatusErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<StatusesAction>) => {
        try {
            const data = new FormData();

            Object.keys(status).forEach(key => data.append(key, status[key]));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: StatusesActionTypes.UPDATE_STATUS, payload: response.data });
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

export const deleteStatus = (id: string, setError: React.Dispatch<SetStateAction<IStatusErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<StatusesAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: StatusesActionTypes.DELETE_STATUS, payload: response.data });
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