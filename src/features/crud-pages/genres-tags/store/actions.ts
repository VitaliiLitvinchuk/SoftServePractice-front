import { Dispatch } from "redux";
import { ICreateGenreTag, GenresTagsAction, GenresTagsActionTypes } from "../store/types";
import { bearer_json, bearer_form } from "../../../../utils/http/creator";
import axios, { AxiosError, CancelToken } from 'axios';
import errorExtractor from "../../../../utils/error/extractor/axios";
import errorNormalizer from "../../../../utils/error/normalizer";
import React, { SetStateAction } from "react";
import { IGenreTagErrorType } from "../modal-form";

const endpoints = {
    get: "/genres-tags/get-all",
    add: "/genres-tags/create",
    delete: "/genres-tags/delete"
}

export const getGenresTags = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GenresTagsAction>) => {
        try {
            const response = await bearer_json(cancelToken).get(endpoints.get);

            dispatch({ type: GenresTagsActionTypes.GET_GENRES_TAGS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addGenreTag = (genreGroup: ICreateGenreTag, setError: React.Dispatch<SetStateAction<IGenreTagErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GenresTagsAction>) => {
        try {
            const data = new FormData();

            Object.keys(genreGroup).forEach((key) => data.append(key, genreGroup[key]));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: GenresTagsActionTypes.ADD_GENRE_TAG, payload: response.data });
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

export const deleteGenreTag = (genreId: string, tagId: string, setError: React.Dispatch<SetStateAction<IGenreTagErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GenresTagsAction>) => {
        try {
            const params = new URLSearchParams({ genreId, tagId });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: GenresTagsActionTypes.DELETE_GENRE_TAG, payload: response.data });
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