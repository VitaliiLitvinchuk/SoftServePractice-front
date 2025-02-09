import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation, IModalFormOption } from '../../../../components/modal-form/types';
import ModalForm from "../../../../components/modal-form";
import React from "react";
import { IGenreTag } from "../store/types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import axios from "axios";

export interface IGenreTagErrorType extends IModalFormError {
    genreId: string
    tagId: string
}

interface IGenreTagWorkerModalProps {
    show: boolean
    genreTag: IGenreTag
    title: string
    error: IGenreTagErrorType
    setError: (error: IGenreTagErrorType) => void
    handleClose: () => void
    handleSubmit: (genreTag: IGenreTag) => void
}

const fields = ['genreId', 'tagId'] as const;

const validation = {
    genreId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],

    tagId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Genre", type: "select", options: [] },
    { title: "Tag", type: "select", options: [] },
] as IFieldSpecifics[];

const GenreTagWorkerModal = React.memo(({ show, genreTag, title, error, setError, handleClose, handleSubmit }: IGenreTagWorkerModalProps) => {
    const [genreId, setGenreId] = useState<string>(genreTag.genreId);
    const [tagId, setTagId] = useState<string>(genreTag.tagId);

    const { getGenres } = useActions("genre");
    const { getTags } = useActions("tag");

    const { genres } = useTypedSelector(state => state.genre);
    const { tags } = useTypedSelector(state => state.tag);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!specifics[0].options?.length) {
            getGenres(source.token);
        }

        if (!specifics[1].options?.length) {
            getTags(source.token);
        }

        return () => {
            source.cancel("Gets for genres, tags and genre tag canceled");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = genres.map(genre => ({ value: genre.id, label: genre.name } as IModalFormOption));
    }, [genres]);

    useEffect(() => {
        specifics[1].options = tags.map(tag => ({ value: tag.id, label: tag.name } as IModalFormOption));
    }, [tags]);

    const setter = useMemo(() => {
        return [setGenreId, setTagId];
    }, []);

    const getter = useMemo(() => {
        return [genreId, tagId];
    }, [genreId, tagId]);

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
                handleSubmit({ ...genreTag, ...e as unknown as IGenreTag });
            }}
        />
    )
});

export default GenreTagWorkerModal;
