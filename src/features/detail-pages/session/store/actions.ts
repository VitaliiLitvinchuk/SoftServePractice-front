import { Dispatch } from "redux";
import { DetailSessionActions, DetailSessionActionTypes, IDetailSession } from "./types";
import axios, { CancelToken } from "axios";
import { bearer_form, http_json } from "../../../../utils/http/creator";
import { ITicket } from "../../../crud-pages/tickets/store/types";
import { ISeat } from "../../../crud-pages/seats/store/types";
import { IPurchaseHistory } from "../../../crud-pages/purchase-histories/store/types";

// This isn't great, but it works for now.
const endpoints = {
    get_session: "/sessions/get-by-id?",
    get_tickets: "/tickets/get-by-session-id?",
    get_seats: "/seats/get-by-hall-id?",
    get_history: "/purchase-histories/get-by-session-id?",
    create_history: "/purchase-histories/create-by-user"
}

export const getSession = (uuid: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<DetailSessionActions>) => {
        try {
            const params = new URLSearchParams({ id: uuid });

            const sess = await http_json(cancelToken).get<IDetailSession, { data: IDetailSession }>(endpoints.get_session + params);
            const session = sess.data;

            const [tickets, seats, history] = await Promise.all([
                http_json(cancelToken).get<ITicket[], { data: ITicket[] }>(endpoints.get_tickets + params),
                http_json(cancelToken).get<ISeat[], { data: ISeat[] }>(
                    endpoints.get_seats + new URLSearchParams({ id: session.hallId })
                ),
                http_json(cancelToken).get<IPurchaseHistory[], { data: IPurchaseHistory[] }>(endpoints.get_history + params)
            ]);

            session.tickets = tickets.data;
            session.seats = seats.data;
            session.histories = history.data;

            dispatch({ type: DetailSessionActionTypes.GET_DETAIL_SESSION, payload: session });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const createPurchase = (ticketUuid: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<DetailSessionActions>) => {
        try {
            const data = new FormData();

            data.append("ticketId", ticketUuid);

            const response = await bearer_form(cancelToken).post<IDetailSession, { data: IPurchaseHistory }>(endpoints.create_history, data);

            dispatch({ type: DetailSessionActionTypes.CREATE_PURCHASE_HISTORY, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const clear = () => (dispatch: Dispatch<DetailSessionActions>) => dispatch({ type: DetailSessionActionTypes.CLEAR });