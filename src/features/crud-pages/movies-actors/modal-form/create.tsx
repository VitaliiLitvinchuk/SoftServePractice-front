import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import React from "react";
import { ICreateMovieActor, IMovieActor } from "../store/types";
import MovieActorWorkerModal, { IMovieActorErrorType } from ".";

const CreateMovieActorModal = React.memo(() => {
    const [movieActor] = useState<IMovieActor>({ movieId: "", actorId: "" });
    const [error, setError] = useState<IMovieActorErrorType>({ movieId: "", actorId: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addMovieActor } = useActions('movieActor');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create movie actor canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = async (movieActor: IMovieActor) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addMovieActor(movieActor as unknown as ICreateMovieActor, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <MovieActorWorkerModal show={show} movieActor={movieActor} title='Create movie actor' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
});

export default CreateMovieActorModal;