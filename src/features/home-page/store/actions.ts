import { Dispatch } from "redux";
import { HomeActions, HomeActionTypes } from "./types";
import axios, { CancelToken } from "axios";
import { http_json } from "../../../utils/http/creator";

const endpoints = {
    get_movies: "/movies/get-all",
}

export const getMovies = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<HomeActions>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get_movies);

            dispatch({ type: HomeActionTypes.GET_HOME_MOVIES, payload: response.data.concat(...Array(4).fill(response.data)).flat() });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}