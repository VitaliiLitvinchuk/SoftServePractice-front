import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { SessionsAction, SessionsActionTypes, ISessionWorker } from "./types";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import { ISessionErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";

const endpoints = {
    get: "/sessions/get-all",
    add: "/sessions/create",
    update: "/sessions/update",
    delete: "/sessions/delete"
}

export const getSessions = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<SessionsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: SessionsActionTypes.GET_SESSIONS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addSession = (session: ISessionWorker, setError: React.Dispatch<SetStateAction<ISessionErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<SessionsAction>) => {
        try {
            const data = new FormData();

            Object.keys(session).forEach(key => data.append(key, session[key] || ""));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: SessionsActionTypes.ADD_SESSION, payload: response.data });
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

export const updateSession = (session: ISessionWorker, setError: React.Dispatch<SetStateAction<ISessionErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<SessionsAction>) => {
        try {
            const data = new FormData();

            Object.keys(session).forEach(key => data.append(key, session[key] || ""));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: SessionsActionTypes.UPDATE_SESSION, payload: response.data });
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

export const deleteSession = (id: string, setError: React.Dispatch<SetStateAction<ISessionErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<SessionsAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: SessionsActionTypes.DELETE_SESSION, payload: response.data });
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