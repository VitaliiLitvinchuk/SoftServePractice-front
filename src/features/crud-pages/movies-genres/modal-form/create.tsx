import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import React from "react";
import { ICreateMovieGenre, IMovieGenre } from "../store/types";
import MovieGenreWorkerModal, { IMovieGenreErrorType } from ".";

const CreateMovieGenreModal = React.memo(() => {
    const [movieGenre] = useState<IMovieGenre>({ movieId: "", genreId: "" });
    const [error, setError] = useState<IMovieGenreErrorType>({ movieId: "", genreId: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addMovieGenre } = useActions('movieGenre');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create movie genre canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = async (movieGenre: IMovieGenre) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addMovieGenre(movieGenre as unknown as ICreateMovieGenre, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <MovieGenreWorkerModal show={show} movieGenre={movieGenre} title='Create movie genre' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
});

export default CreateMovieGenreModal;