import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import GenreWorkerModal, { IGenreErrorType } from ".";
import { IGenre } from "../store/types";

const CreateGenreModal = () => {
    const [genre] = useState<IGenre>({ id: "", name: "" });
    const [error, setError] = useState<IGenreErrorType>({ name: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addGenre } = useActions('genre');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create genre canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (genre: IGenre) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addGenre(genre, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <GenreWorkerModal show={show} genre={genre} title='Create genre' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateGenreModal;