import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation, IModalFormOption } from '../../../../components/modal-form/types';
import ModalForm from "../../../../components/modal-form";
import React from "react";
import { IMovieActor } from "../store/types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import axios from "axios";

export interface IMovieActorErrorType extends IModalFormError {
    movieId: string
    actorId: string
}

interface IMovieActorWorkerModalProps {
    show: boolean
    movieActor: IMovieActor
    title: string
    error: IMovieActorErrorType
    setError: (error: IMovieActorErrorType) => void
    handleClose: () => void
    handleSubmit: (movieActor: IMovieActor) => void
}

const fields = ['movieId', 'actorId'] as const;

const validation = {
    movieId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    actorId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Movie", type: "select", options: [] },
    { title: "Actor", type: "select", options: [] },
] as IFieldSpecifics[];

const MovieActorWorkerModal = React.memo(({ show, movieActor, title, error, setError, handleClose, handleSubmit }: IMovieActorWorkerModalProps) => {
    const [movieId, setMovieId] = useState<string>(movieActor.movieId);
    const [actorId, setActorId] = useState<string>(movieActor.actorId);

    const { getMovies } = useActions("movie");
    const { getActors } = useActions("actor");

    const { movies } = useTypedSelector(state => state.movie);
    const { actors } = useTypedSelector(state => state.actor);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!specifics[0].options?.length) {
            getMovies(source.token);
        }

        if (!specifics[1].options?.length) {
            getActors(source.token);
        }

        return () => {
            source.cancel("Gets for movies, actors and movie actor canceled");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = movies.map(movie => ({ value: movie.id, label: movie.name } as IModalFormOption));
    }, [movies]);

    useEffect(() => {
        specifics[1].options = actors.map(actor => ({ value: actor.id, label: `${actor.name} ${actor.middlename} ${actor.surname}` } as IModalFormOption));
    }, [actors]);

    const setter = useMemo(() => {
        return [setMovieId, setActorId];
    }, []);

    const getter = useMemo(() => {
        return [movieId, actorId];
    }, [movieId, actorId]);

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
                handleSubmit({ ...movieActor, ...e as unknown as IMovieActor });
            }}
        />
    )
});

export default MovieActorWorkerModal;
