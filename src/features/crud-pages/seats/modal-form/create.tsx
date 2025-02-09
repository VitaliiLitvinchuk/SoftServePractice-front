import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import SeatWorkerModal, { ISeatErrorType } from ".";
import { ISeatWorker } from "../store/types";

const CreateSeatModal = () => {
    const [seat] = useState<ISeatWorker>({ id: "", row: "", number: "", hallId: "" });
    const [error, setError] = useState<ISeatErrorType>({ row: "", number: "", hallId: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addSeat } = useActions('seat');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create seat canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (seat: ISeatWorker) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addSeat(seat, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <SeatWorkerModal show={show} seat={seat} title='Create seat' error={error} skip={[]} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateSeatModal;