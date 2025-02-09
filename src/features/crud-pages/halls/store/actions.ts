import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { IHall, HallsAction, HallsActionTypes } from "./types";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import { IHallErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";

const endpoints = {
    get: "/halls/get-all",
    add: "/halls/create",
    update: "/halls/update",
    delete: "/halls/delete"
}

export const getHalls = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<HallsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: HallsActionTypes.GET_HALLS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addHall = (hall: IHall, setError: React.Dispatch<SetStateAction<IHallErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<HallsAction>) => {
        try {
            const data = new FormData();

            Object.keys(hall).forEach(key => data.append(key, hall[key] as string));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: HallsActionTypes.ADD_HALL, payload: response.data });
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

export const updateHall = (hall: IHall, setError: React.Dispatch<SetStateAction<IHallErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<HallsAction>) => {
        try {
            const data = new FormData();

            Object.keys(hall).forEach(key => data.append(key, hall[key] as string));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: HallsActionTypes.UPDATE_HALL, payload: response.data });
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

export const deleteHall = (id: string, setError: React.Dispatch<SetStateAction<IHallErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<HallsAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: HallsActionTypes.DELETE_HALL, payload: response.data });
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