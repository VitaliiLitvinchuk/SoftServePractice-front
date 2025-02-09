import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import SessionWorkerModal, { ISessionErrorType } from ".";
import { ISessionWorker } from "../store/types";

const CreateSessionModal = () => {
    const [session] = useState<ISessionWorker>({ id: "", statusId: "", movieId: "", hallId: "", startAt: "", endAt: "" });
    const [error, setError] = useState<ISessionErrorType>({ statusId: "", movieId: "", hallId: "", startAt: "", endAt: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addSession } = useActions('session');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create session canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (session: ISessionWorker) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addSession(session, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <SessionWorkerModal show={show} session={session} title='Create session' error={error} skip={["statusId"]} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateSessionModal;