import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import TicketWorkerModal, { ITicketErrorType } from ".";
import { ITicketWorker } from "../store/types";

const CreateTicketModal = () => {
    const [ticket] = useState<ITicketWorker>({ id: "", sessionId: "", seatId: "", price: "" });
    const [error, setError] = useState<ITicketErrorType>({ sessionId: "", seatId: "", price: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addTicket } = useActions('ticket');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create ticket canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (ticket: ITicketWorker) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addTicket(ticket, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <TicketWorkerModal show={show} ticket={ticket} title='Create ticket' error={error} skip={[]} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateTicketModal;