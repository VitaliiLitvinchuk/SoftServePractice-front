import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import React from "react";
import { IMovieRating, IMovieRatingWorker } from "../store/types";
import MovieRatingWorkerModal, { IMovieRatingErrorType } from ".";

const CreateMovieRatingModal = React.memo(() => {
    const [movieRating] = useState<IMovieRating>({ movieId: "", userId: "", rate: "" });
    const [error, setError] = useState<IMovieRatingErrorType>({ movieId: "", userId: "", rating: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addMoviesRating } = useActions('movieRating');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create movie rating canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = async (movieRating: IMovieRating) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addMoviesRating(movieRating as IMovieRatingWorker, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <MovieRatingWorkerModal show={show} movieRating={movieRating} title='Create movie rating' error={error} skip={[]} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
});

export default CreateMovieRatingModal;