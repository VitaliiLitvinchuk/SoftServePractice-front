import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { MoviesAction, MoviesActionTypes, IMovieWorker } from "./types";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import { IMovieErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";

const endpoints = {
    get: "/movies/get-all",
    add: "/movies/create",
    update: "/movies/update",
    delete: "/movies/delete"
}

export const getMovies = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: MoviesActionTypes.GET_MOVIES, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addMovie = (movie: IMovieWorker, setError: React.Dispatch<SetStateAction<IMovieErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesAction>) => {
        try {
            const data = new FormData();

            Object.keys(movie).forEach(key => data.append(key, movie[key] || ""));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: MoviesActionTypes.ADD_MOVIE, payload: response.data });
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

export const updateMovie = (movie: IMovieWorker, setError: React.Dispatch<SetStateAction<IMovieErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesAction>) => {
        try {
            const data = new FormData();

            Object.keys(movie).forEach(key => data.append(key, movie[key] || ""));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: MoviesActionTypes.UPDATE_MOVIE, payload: response.data });
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

export const deleteMovie = (id: string, setError: React.Dispatch<SetStateAction<IMovieErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: MoviesActionTypes.DELETE_MOVIE, payload: response.data });
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