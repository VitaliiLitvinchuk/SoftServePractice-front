import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import StatusWorkerModal, { IStatusErrorType } from ".";
import { IStatus } from "../store/types";

const CreateStatusModal = () => {
    const [status] = useState<IStatus>({ id: "", name: "" });
    const [error, setError] = useState<IStatusErrorType>({ name: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addStatus } = useActions('status');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create status canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (status: IStatus) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addStatus(status, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <StatusWorkerModal show={show} status={status} title='Create status' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateStatusModal;