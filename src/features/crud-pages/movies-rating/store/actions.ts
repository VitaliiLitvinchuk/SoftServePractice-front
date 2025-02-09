import axios, { AxiosError, CancelToken } from "axios";
import { IMovieRatingWorker, MoviesRatingsAction, MoviesRatingsActionTypes } from "../store/types";
import { bearer_json, bearer_form, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";
import errorExtractor from "../../../../utils/error/extractor/axios";
import errorNormalizer from "../../../../utils/error/normalizer";
import { SetStateAction } from "react";
import { IMovieRatingErrorType } from "../modal-form";

const endpoints = {
    get: "/movies-ratings/get-all",
    create: "/movies-ratings/create",
    update: "/movies-ratings/update",
    delete: "/movies-ratings/delete",
};

export const getMoviesRatings = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesRatingsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: MoviesRatingsActionTypes.GET_MOVIES_RATINGS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addMoviesRating = (movieRating: IMovieRatingWorker, setError: React.Dispatch<SetStateAction<IMovieRatingErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesRatingsAction>) => {
        try {
            const data = new FormData();

            Object.keys(movieRating).forEach(key => data.append(key, movieRating[key]));

            const response = await bearer_form(cancelToken).post(endpoints.create, data);

            dispatch({ type: MoviesRatingsActionTypes.ADD_MOVIE_RATING, payload: response.data });
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

export const updateMoviesRating = (movieRating: IMovieRatingWorker, setError: React.Dispatch<SetStateAction<IMovieRatingErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesRatingsAction>) => {
        try {
            const data = new FormData();

            Object.keys(movieRating).forEach(key => data.append(key, movieRating[key]));

            const response = await bearer_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: MoviesRatingsActionTypes.UPDATE_MOVIE_RATING, payload: response.data });
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

export const deleteMoviesRating = (movieId: string, userId: string, setError: React.Dispatch<SetStateAction<IMovieRatingErrorType>>, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<MoviesRatingsAction>) => {
        try {
            const params = new URLSearchParams({ movieId, userId });

            const response = await bearer_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: MoviesRatingsActionTypes.DELETE_MOVIE_RATING, payload: response.data });
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
