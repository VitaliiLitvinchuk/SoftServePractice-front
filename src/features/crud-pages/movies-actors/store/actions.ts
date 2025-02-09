import { Dispatch } from "redux";
import { ICreateMovieActor, MoviesActorsAction, MoviesActorsActionTypes } from "../store/types";
import { bearer_json, bearer_form } from "../../../../utils/http/creator";
import axios, { AxiosError, CancelToken } from 'axios';
import errorExtractor from "../../../../utils/error/extractor/axios";
import errorNormalizer from "../../../../utils/error/normalizer";
import React, { SetStateAction } from "react";
import { IMovieActorErrorType } from "../modal-form";

const endpoints = {
    get: "/movies-actors/get-all",
    add: "/movies-actors/create",
    delete: "/movies-actors/delete"
}

export const getMoviesActors = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesActorsAction>) => {
        try {
            const response = await bearer_json(cancelToken).get(endpoints.get);

            dispatch({ type: MoviesActorsActionTypes.GET_MOVIES_ACTORS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addMovieActor = (movieActor: ICreateMovieActor, setError: React.Dispatch<SetStateAction<IMovieActorErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesActorsAction>) => {
        try {
            const data = new FormData();

            Object.keys(movieActor).forEach((key) => data.append(key, movieActor[key]));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: MoviesActorsActionTypes.ADD_MOVIE_ACTOR, payload: response.data });
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

export const deleteMovieActor = (movieId: string, actorId: string, setError: React.Dispatch<SetStateAction<IMovieActorErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesActorsAction>) => {
        try {
            const params = new URLSearchParams({ movieId, actorId });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: MoviesActorsActionTypes.DELETE_MOVIE_ACTOR, payload: response.data });
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