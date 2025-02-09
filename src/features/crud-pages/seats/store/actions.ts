import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { SeatsAction, SeatsActionTypes, ISeatWorker } from "./types";
import React, { SetStateAction } from "react";
import { ISeatErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";
import errorExtractor from "../../../../utils/error/extractor/axios";

const endpoints = {
    get: "/seats/get-all",
    add: "/seats/create",
    update: "/seats/update",
    delete: "/seats/delete"
}

export const getSeats = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<SeatsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: SeatsActionTypes.GET_SEATS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addSeat = (seat: ISeatWorker, setError: React.Dispatch<SetStateAction<ISeatErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<SeatsAction>) => {
        try {
            const data = new FormData();

            Object.keys(seat).forEach(key => data.append(key, seat[key] || ""));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: SeatsActionTypes.ADD_SEAT, payload: response.data });
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

export const updateSeat = (seat: ISeatWorker, setError: React.Dispatch<SetStateAction<ISeatErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<SeatsAction>) => {
        try {
            const data = new FormData();

            Object.keys(seat).forEach(key => data.append(key, seat[key] || ""));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: SeatsActionTypes.UPDATE_SEAT, payload: response.data });
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

export const deleteSeat = (id: string, setError: React.Dispatch<SetStateAction<ISeatErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<SeatsAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: SeatsActionTypes.DELETE_SEAT, payload: response.data });
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