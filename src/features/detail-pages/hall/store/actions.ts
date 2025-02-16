import { Dispatch } from "redux";
import { DetailHallActions, DetailHallActionTypes, IDetailHall } from "./types";
import axios, { CancelToken } from "axios";
import { http_json } from "../../../../utils/http/creator";
import { ISeat } from "../../../crud-pages/seats/store/types";

// This isn't great, but it works for now.
const endpoints = {
    get_hall: "/halls/get-by-id?",
    get_seats: "/seats/get-by-hall-id?"
}

export const getHall = (uuid: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<DetailHallActions>) => {
        try {
            const params = new URLSearchParams({ id: uuid });

            const [hole, seats] = await Promise.all([
                http_json(cancelToken).get<IDetailHall, { data: IDetailHall }>(endpoints.get_hall + params),
                http_json(cancelToken).get<ISeat[], { data: ISeat[] }>(endpoints.get_seats + params)
            ]);

            const hall = hole.data;
            hall.seats = seats.data;

            dispatch({ type: DetailHallActionTypes.GET_DETAIL_HALL, payload: hall });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const clear = () => (dispatch: Dispatch<DetailHallActions>) => dispatch({ type: DetailHallActionTypes.CLEAR });