import { Dispatch } from "redux";
import { ICreateMovieGenre, MoviesGenresAction, MoviesGenresActionTypes } from "../store/types";
import { bearer_json, bearer_form } from "../../../../utils/http/creator";
import axios, { AxiosError, CancelToken } from 'axios';
import errorExtractor from "../../../../utils/error/extractor/axios";
import errorNormalizer from "../../../../utils/error/normalizer";
import React, { SetStateAction } from "react";
import { IMovieGenreErrorType } from "../modal-form";

const endpoints = {
    get: "/movies-genres/get-all",
    add: "/movies-genres/create",
    delete: "/movies-genres/delete"
}

export const getMoviesGenres = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesGenresAction>) => {
        try {
            const response = await bearer_json(cancelToken).get(endpoints.get);

            dispatch({ type: MoviesGenresActionTypes.GET_MOVIES_GENRES, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addMovieGenre = (movieGenre: ICreateMovieGenre, setError: React.Dispatch<SetStateAction<IMovieGenreErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesGenresAction>) => {
        try {
            const data = new FormData();

            Object.keys(movieGenre).forEach((key) => data.append(key, movieGenre[key]));

            const response = await bearer_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: MoviesGenresActionTypes.ADD_MOVIE_GENRE, payload: response.data });
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

export const deleteMovieGenre = (movieId: string, genreId: string, setError: React.Dispatch<SetStateAction<IMovieGenreErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesGenresAction>) => {
        try {
            const params = new URLSearchParams({ movieId, genreId });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: MoviesGenresActionTypes.DELETE_MOVIE_GENRE, payload: response.data });
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