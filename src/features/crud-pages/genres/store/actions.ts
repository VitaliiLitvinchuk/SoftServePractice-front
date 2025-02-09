import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { IGenre, GenresAction, GenresActionTypes } from "./types";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import { IGenreErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";

const endpoints = {
    get: "/genres/get-all",
    add: "/genres/create",
    update: "/genres/update",
    delete: "/genres/delete"
}

export const getGenres = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GenresAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: GenresActionTypes.GET_GENRES, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addGenre = (genre: IGenre, setError: React.Dispatch<SetStateAction<IGenreErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GenresAction>) => {
        try {
            const data = new FormData();

            Object.keys(genre).forEach(key => data.append(key, genre[key]));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: GenresActionTypes.ADD_GENRE, payload: response.data });
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

export const updateGenre = (genre: IGenre, setError: React.Dispatch<SetStateAction<IGenreErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GenresAction>) => {
        try {
            const data = new FormData();

            Object.keys(genre).forEach(key => data.append(key, genre[key]));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: GenresActionTypes.UPDATE_GENRE, payload: response.data });
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

export const deleteGenre = (id: string, setError: React.Dispatch<SetStateAction<IGenreErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GenresAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: GenresActionTypes.DELETE_GENRE, payload: response.data });
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