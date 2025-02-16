import { Dispatch } from "redux";
import { DetailMovieActions, DetailMovieActionTypes, IDetailMovie } from "./types";
import axios, { CancelToken } from "axios";
import { http_json } from "../../../../utils/http/creator";
import { IMovieGenre } from "../../../crud-pages/movies-genres/store/types";
import { IMovieTag } from "../../../crud-pages/movies-tags/store/types";
import { IMovieActor } from "../../../crud-pages/movies-actors/store/types";
import { ISession } from "../../../crud-pages/sessions/store/types";
import { IMovieRating } from "../../../crud-pages/movies-rating/store/types";

// This isn't great, but it works for now.
const endpoints = {
    get_movie: "/movies/get-by-id?",
    get_genres: "/movies-genres/get-by-movie-id?",
    get_tags: "/movies-tags/get-by-movie-id?",
    get_actors: "/movies-actors/get-by-movie-id?",
    get_sessions: "/sessions/get-by-movie-id?",
    get_ratings: "/movies-ratings/get-by-movie-id?",
}

export const getMovie = (uuid: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<DetailMovieActions>) => {
        try {
            const params = new URLSearchParams({ id: uuid });

            const [mov, genres, tags, actors, sessions, ratings] = await Promise.all([
                http_json(cancelToken).get<IDetailMovie, { data: IDetailMovie }>(endpoints.get_movie + params),
                http_json(cancelToken).get<IMovieGenre[], { data: IMovieGenre[] }>(endpoints.get_genres + params),
                http_json(cancelToken).get<IMovieTag[], { data: IMovieTag[] }>(endpoints.get_tags + params),
                http_json(cancelToken).get<IMovieActor[], { data: IMovieActor[] }>(endpoints.get_actors + params),
                http_json(cancelToken).get<ISession[], { data: ISession[] }>(endpoints.get_sessions + params),
                http_json(cancelToken).get<IMovieRating[], { data: IMovieRating[] }>(endpoints.get_ratings + params)
            ]);

            const movie = mov.data;
            movie.genres = genres.data.map(x => x.genre).filter(x => !!x);
            movie.tags = tags.data.map(x => x.tag).filter(x => !!x);
            movie.actors = actors.data.map(x => x.actor).filter(x => !!x);
            movie.sessions = sessions.data.filter(session => session.status?.name === "Pending");
            movie.ratings = ratings.data;

            dispatch({ type: DetailMovieActionTypes.GET_DETAIL_MOVIE, payload: movie });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const clear = () => (dispatch: Dispatch<DetailMovieActions>) => dispatch({ type: DetailMovieActionTypes.CLEAR });