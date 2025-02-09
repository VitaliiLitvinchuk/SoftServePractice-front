import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation, IModalFormOption } from '../../../../components/modal-form/types';
import ModalForm from "../../../../components/modal-form";
import React from "react";
import { IMovieTag } from "../store/types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import axios from "axios";

export interface IMovieTagErrorType extends IModalFormError {
    movieId: string
    tagId: string
}

interface IMovieTagWorkerModalProps {
    show: boolean
    movieTag: IMovieTag
    title: string
    error: IMovieTagErrorType
    setError: (error: IMovieTagErrorType) => void
    handleClose: () => void
    handleSubmit: (movieTag: IMovieTag) => void
}

const fields = ['movieId', 'tagId'] as const;

const validation = {
    movieId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    tagId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Movie", type: "select", options: [] },
    { title: "Tag", type: "select", options: [] },
] as IFieldSpecifics[];

const MovieTagWorkerModal = React.memo(({ show, movieTag, title, error, setError, handleClose, handleSubmit }: IMovieTagWorkerModalProps) => {
    const [movieId, setMovieId] = useState<string>(movieTag.movieId);
    const [tagId, setTagId] = useState<string>(movieTag.tagId);

    const { getMovies } = useActions("movie");
    const { getTags } = useActions("tag");

    const { movies } = useTypedSelector(state => state.movie);
    const { tags } = useTypedSelector(state => state.tag);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!specifics[0].options?.length) {
            getMovies(source.token);
        }

        if (!specifics[1].options?.length) {
            getTags(source.token);
        }

        return () => {
            source.cancel("Gets for movies, tags and movie tag canceled");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = movies.map(movie => ({ value: movie.id, label: movie.name } as IModalFormOption));
    }, [movies]);

    useEffect(() => {
        specifics[1].options = tags.map(tag => ({ value: tag.id, label: tag.name } as IModalFormOption));
    }, [tags]);

    const setter = useMemo(() => {
        return [setMovieId, setTagId];
    }, []);

    const getter = useMemo(() => {
        return [movieId, tagId];
    }, [movieId, tagId]);

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
                handleSubmit({ ...movieTag, ...e as unknown as IMovieTag });
            }}
        />
    )
});

export default MovieTagWorkerModal;
