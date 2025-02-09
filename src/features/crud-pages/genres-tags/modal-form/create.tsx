import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import React from "react";
import { ICreateGenreTag, IGenreTag } from "../store/types";
import GenreTagWorkerModal, { IGenreTagErrorType } from ".";

const CreateGenreTagModal = React.memo(() => {
    const [genreTag] = useState<IGenreTag>({ genreId: "", tagId: "" });
    const [error, setError] = useState<IGenreTagErrorType>({ genreId: "", tagId: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addGenreTag } = useActions('genreTag');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create genre tag canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = async (genreTag: IGenreTag) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addGenreTag(genreTag as unknown as ICreateGenreTag, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <GenreTagWorkerModal show={show} genreTag={genreTag} title='Create genre tag' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
});

export default CreateGenreTagModal;