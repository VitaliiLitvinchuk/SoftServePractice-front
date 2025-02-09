import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import ActorWorkerModal, { IActorErrorType } from ".";
import { IActorWorker } from "../store/types";

const CreateActorModal = () => {
    const [actor] = useState<IActorWorker>({ id: "", name: "", surname: "", middlename: "", image: null });
    const [error, setError] = useState<IActorErrorType>({ name: "", surname: "", middlename: "", imageUrl: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addActor } = useActions('actor');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create actor canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (actor: IActorWorker) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addActor(actor, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <ActorWorkerModal show={show} actor={actor} title='Create actor' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateActorModal;