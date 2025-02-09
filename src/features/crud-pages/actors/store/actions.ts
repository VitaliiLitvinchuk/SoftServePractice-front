import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { ActorsAction, ActorsActionTypes, IActorWorker } from "./types";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import { IActorErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";

const endpoints = {
    get: "/actors/get-all",
    add: "/actors/create",
    update: "/actors/update",
    delete: "/actors/delete"
}

export const getActors = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<ActorsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: ActorsActionTypes.GET_ACTORS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addActor = (actor: IActorWorker, setError: React.Dispatch<SetStateAction<IActorErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<ActorsAction>) => {
        try {
            const data = new FormData();

            Object.keys(actor).forEach(key => data.append(key, actor[key] || ""));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: ActorsActionTypes.ADD_ACTOR, payload: response.data });
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

export const updateActor = (actor: IActorWorker, setError: React.Dispatch<SetStateAction<IActorErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<ActorsAction>) => {
        try {
            const data = new FormData();

            Object.keys(actor).forEach(key => data.append(key, actor[key] || ""));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: ActorsActionTypes.UPDATE_ACTOR, payload: response.data });
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

export const deleteActor = (id: string, setError: React.Dispatch<SetStateAction<IActorErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<ActorsAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: ActorsActionTypes.DELETE_ACTOR, payload: response.data });
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