import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation, IModalFormOption } from '../../../../components/modal-form/types';
import ModalForm from "../../../../components/modal-form";
import React from "react";
import { IMovieGenre } from "../store/types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import axios from "axios";

export interface IMovieGenreErrorType extends IModalFormError {
    movieId: string
    genreId: string
}

interface IMovieGenreWorkerModalProps {
    show: boolean
    movieGenre: IMovieGenre
    title: string
    error: IMovieGenreErrorType
    setError: (error: IMovieGenreErrorType) => void
    handleClose: () => void
    handleSubmit: (movieGenre: IMovieGenre) => void
}

const fields = ['movieId', 'genreId'] as const;

const validation = {
    movieId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    genreId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Movie", type: "select", options: [] },
    { title: "Genre", type: "select", options: [] },
] as IFieldSpecifics[];

const MovieGenreWorkerModal = React.memo(({ show, movieGenre, title, error, setError, handleClose, handleSubmit }: IMovieGenreWorkerModalProps) => {
    const [movieId, setMovieId] = useState<string>(movieGenre.movieId);
    const [genreId, setGenreId] = useState<string>(movieGenre.genreId);

    const { getMovies } = useActions("movie");
    const { getGenres } = useActions("genre");

    const { movies } = useTypedSelector(state => state.movie);
    const { genres } = useTypedSelector(state => state.genre);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!specifics[0].options?.length) {
            getMovies(source.token);
        }

        if (!specifics[1].options?.length) {
            getGenres(source.token);
        }

        return () => {
            source.cancel("Gets for movies, genres and movie genre canceled");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = movies.map(movie => ({ value: movie.id, label: movie.name } as IModalFormOption));
    }, [movies]);

    useEffect(() => {
        specifics[1].options = genres.map(genre => ({ value: genre.id, label: genre.name } as IModalFormOption));
    }, [genres]);

    const setter = useMemo(() => {
        return [setMovieId, setGenreId];
    }, []);

    const getter = useMemo(() => {
        return [movieId, genreId];
    }, [movieId, genreId]);

    return (
        <ModalForm
            show={show}
            title={title}
            getter={getter}
            setter={setter as Dispatch<SetStateAction<string | File | null>>[]}
            error={error}
            validation={validation}
            specifics={specifics}
            fields={fields}
            handleClose={handleClose}
            setError={setError as Dispatch<SetStateAction<IModalFormError>>}
            handleSubmit={(e) => {
                handleSubmit({ ...movieGenre, ...e as unknown as IMovieGenre });
            }}
        />
    )
});

export default MovieGenreWorkerModal;
