import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { IPurchaseHistoriesWorker, PurchaseHistoriesAction, PurchaseHistoriesActionTypes } from "./types";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import { IPurchaseHistoryErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";

const endpoints = {
    get: "/purchase-histories/get-all",
    add: "/purchase-histories/create",
    delete: "/purchase-histories/delete"
}

export const getPurchaseHistories = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<PurchaseHistoriesAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: PurchaseHistoriesActionTypes.GET_HISTORIES, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addPurchaseHistory = (history: IPurchaseHistoriesWorker, setError: React.Dispatch<SetStateAction<IPurchaseHistoryErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<PurchaseHistoriesAction>) => {
        try {
            const data = new FormData();

            Object.keys(history).forEach(key => data.append(key, history[key]));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: PurchaseHistoriesActionTypes.ADD_HISTORY, payload: response.data });
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

export const deletePurchaseHistory = (id: string, setError: React.Dispatch<SetStateAction<IPurchaseHistoryErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<PurchaseHistoriesAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: PurchaseHistoriesActionTypes.DELETE_HISTORY, payload: response.data });
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