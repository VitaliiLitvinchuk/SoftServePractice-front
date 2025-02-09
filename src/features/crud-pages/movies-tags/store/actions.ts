import { Dispatch } from "redux";
import { ICreateMovieTag, MoviesTagsAction, MoviesTagsActionTypes } from "../store/types";
import { bearer_json, bearer_form } from "../../../../utils/http/creator";
import axios, { AxiosError, CancelToken } from 'axios';
import errorExtractor from "../../../../utils/error/extractor/axios";
import errorNormalizer from "../../../../utils/error/normalizer";
import React, { SetStateAction } from "react";
import { IMovieTagErrorType } from "../modal-form";

const endpoints = {
    get: "/movies-tags/get-all",
    add: "/movies-tags/create",
    delete: "/movies-tags/delete"
}

export const getMoviesTags = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesTagsAction>) => {
        try {
            const response = await bearer_json(cancelToken).get(endpoints.get);

            dispatch({ type: MoviesTagsActionTypes.GET_MOVIES_TAGS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addMovieTag = (movieTag: ICreateMovieTag, setError: React.Dispatch<SetStateAction<IMovieTagErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesTagsAction>) => {
        try {
            const data = new FormData();

            Object.keys(movieTag).forEach((key) => data.append(key, movieTag[key]));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: MoviesTagsActionTypes.ADD_MOVIE_TAG, payload: response.data });
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

export const deleteMovieTag = (movieId: string, tagId: string, setError: React.Dispatch<SetStateAction<IMovieTagErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesTagsAction>) => {
        try {
            const params = new URLSearchParams({ movieId, tagId });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: MoviesTagsActionTypes.DELETE_MOVIE_TAG, payload: response.data });
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