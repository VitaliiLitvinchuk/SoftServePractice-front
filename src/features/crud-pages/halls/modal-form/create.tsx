import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import HallWorkerModal, { IHallErrorType } from ".";
import { IHall } from "../store/types";

const CreateHallModal = () => {
    const [hall] = useState<IHall>({ id: "", name: "", capacity: "" });
    const [error, setError] = useState<IHallErrorType>({ name: "", capacity: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addHall } = useActions('hall');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create hall canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (hall: IHall) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addHall(hall, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <HallWorkerModal show={show} hall={hall} title='Create hall' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateHallModal;