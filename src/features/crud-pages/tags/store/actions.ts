import axios, { AxiosError, CancelToken } from "axios";
import { bearer_form, bearer_json, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import { ITag, TagsAction, TagsActionTypes } from "./types";
import errorExtractor from "../../../../utils/error/extractor/axios";
import React, { SetStateAction } from "react";
import { ITagErrorType } from "../modal-form";
import errorNormalizer from "../../../../utils/error/normalizer";

const endpoints = {
    get: "/tags/get-all",
    add: "/tags/create",
    update: "/tags/update",
    delete: "/tags/delete"
}

export const getTags = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<TagsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: TagsActionTypes.GET_TAGS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addTag = (tag: ITag, setError: React.Dispatch<SetStateAction<ITagErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<TagsAction>) => {
        try {
            const data = new FormData();

            data.append("name", tag.name);

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: TagsActionTypes.ADD_TAG, payload: response.data });
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

export const updateTag = (tag: ITag, setError: React.Dispatch<SetStateAction<ITagErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<TagsAction>) => {
        try {
            const data = new FormData();

            Object.keys(tag).forEach(key => data.append(key, tag[key]));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: TagsActionTypes.UPDATE_TAG, payload: response.data });
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

export const deleteTag = (id: string, setError: React.Dispatch<SetStateAction<ITagErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<TagsAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: TagsActionTypes.DELETE_TAG, payload: response.data });
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