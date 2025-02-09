import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation, IModalFormOption } from '../../../../components/modal-form/types';
import ModalForm from "../../../../components/modal-form";
import React from "react";
import { IMovieRating } from "../store/types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import axios from "axios";

export interface IMovieRatingErrorType extends IModalFormError {
    movieId: string
    userId: string
    rating: string
}

interface IMovieRatingWorkerModalProps {
    show: boolean
    movieRating: IMovieRating
    title: string
    error: IMovieRatingErrorType
    skip: Array<typeof fields[number]>
    setError: (error: IMovieRatingErrorType) => void
    handleClose: () => void
    handleSubmit: (movieRating: IMovieRating) => void
}

const fields = ['movieId', 'userId', 'rating'] as const;

const validation = {
    movieId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    userId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    rating: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => Number.isInteger(+value), message: "The {validationFor} must be an integer" },
        { func: (value: string) => +value > 0, message: "The {validationFor} must be greater than 0" },
        { func: (value: string) => +value <= 10, message: "The {validationFor} must be less or equal than 10" },
    ] as IValidation[],
}

const specifics = [
    { title: "Movie", type: "select", options: [] },
    { title: "User", type: "select", options: [] },
    { title: "Rating", type: "number" },
] as IFieldSpecifics[];

const MovieRatingWorkerModal = React.memo(({ show, movieRating, title, error, skip, setError, handleClose, handleSubmit }: IMovieRatingWorkerModalProps) => {
    const [movieId, setMovieId] = useState<string>(movieRating.movieId);
    const [userId, setUserId] = useState<string>(movieRating.userId);
    const [rating, setRating] = useState<string>(movieRating.rate);

    const [skipSequence, setSkipSequence] = useState<number[]>([]);

    const { getMovies } = useActions("movie");
    const { getUsers } = useActions("user");

    const { movies } = useTypedSelector(state => state.movie);
    const { users } = useTypedSelector(state => state.user);

    useEffect(() => {
        const seq: number[] = [];

        skip.forEach((item) => {
            if (fields.includes(item)) {
                seq.push(fields.indexOf(item));
            }
        });

        setSkipSequence(seq);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!skip.includes(fields[0]) && !specifics[0].options?.length) {
            getMovies(source.token);
        }

        if (!skip.includes(fields[1]) && !specifics[1].options?.length) {
            getUsers(source.token);
        }

        return () => {
            source.cancel("Gets for movies, users and movie user canceled");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = movies.map(movie => ({ value: movie.id, label: movie.name } as IModalFormOption));
    }, [movies]);

    useEffect(() => {
        specifics[1].options = users.map(user => ({ value: user.id, label: user.email } as IModalFormOption));
    }, [users]);

    const setter = useMemo(() => {
        return [setMovieId, setUserId, setRating];
    }, []);

    const getter = useMemo(() => {
        return [movieId, userId, rating];
    }, [movieId, userId, rating]);

    return (
        <ModalForm
            show={show}
            title={title}
            getter={getter}
            setter={setter as Dispatch<SetStateAction<string | File | null>>[]}
            error={error}
            validation={validation}
            specifics={specifics.filter((_, index) => !skipSequence.includes(index))}
            fields={fields.filter(field => !skip.includes(field))}
            handleClose={handleClose}
            setError={setError as Dispatch<SetStateAction<IModalFormError>>}
            handleSubmit={(e) => {
                handleSubmit({ ...movieRating, ...e as unknown as IMovieRating });
            }}
        />
    )
});

export default MovieRatingWorkerModal;
