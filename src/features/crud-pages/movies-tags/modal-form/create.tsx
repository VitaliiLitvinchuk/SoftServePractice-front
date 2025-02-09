import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import React from "react";
import { ICreateMovieTag, IMovieTag } from "../store/types";
import MovieTagWorkerModal, { IMovieTagErrorType } from ".";

const CreateMovieTagModal = React.memo(() => {
    const [movieTag] = useState<IMovieTag>({ movieId: "", tagId: "" });
    const [error, setError] = useState<IMovieTagErrorType>({ movieId: "", tagId: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addMovieTag } = useActions('movieTag');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create movie tag canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = async (movieTag: IMovieTag) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addMovieTag(movieTag as unknown as ICreateMovieTag, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <MovieTagWorkerModal show={show} movieTag={movieTag} title='Create movie tag' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
});

export default CreateMovieTagModal;