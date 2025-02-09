import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import MovieWorkerModal, { IMovieErrorType } from ".";
import { IMovieWorker } from "../store/types";

const CreateMovieModal = () => {
    const [movie] = useState<IMovieWorker>({ id: "", name: "", duration: "", trailerUrl: "", image: null, description: "", releaseDate: "" });
    const [error, setError] = useState<IMovieErrorType>({ name: "", duration: "", trailerUrl: "", imageUrl: "", description: "", releaseDate: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addMovie } = useActions('movie');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create movie canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (movie: IMovieWorker) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addMovie(movie, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <MovieWorkerModal show={show} movie={movie} title='Create movie' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateMovieModal;