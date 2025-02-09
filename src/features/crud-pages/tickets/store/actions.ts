import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { TicketsAction, TicketsActionTypes, ITicketWorker } from "./types";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import { ITicketErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";

const endpoints = {
    get: "/tickets/get-all",
    add: "/tickets/create",
    update: "/tickets/update",
    delete: "/tickets/delete"
}

export const getTickets = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<TicketsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: TicketsActionTypes.GET_TICKETS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addTicket = (ticket: ITicketWorker, setError: React.Dispatch<SetStateAction<ITicketErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<TicketsAction>) => {
        try {
            const data = new FormData();

            Object.keys(ticket).forEach(key => data.append(key, ticket[key] || ""));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: TicketsActionTypes.ADD_TICKET, payload: response.data });
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

export const updateTicket = (ticket: ITicketWorker, setError: React.Dispatch<SetStateAction<ITicketErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<TicketsAction>) => {
        try {
            const data = new FormData();

            Object.keys(ticket).forEach(key => data.append(key, ticket[key] || ""));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: TicketsActionTypes.UPDATE_TICKET, payload: response.data });
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

export const deleteTicket = (id: string, setError: React.Dispatch<SetStateAction<ITicketErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<TicketsAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: TicketsActionTypes.DELETE_TICKET, payload: response.data });
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