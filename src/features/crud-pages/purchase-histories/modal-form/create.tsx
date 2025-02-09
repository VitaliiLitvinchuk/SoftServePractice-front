import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import PurchaseHistoryWorkerModal, { IPurchaseHistoryErrorType } from ".";
import { IPurchaseHistoriesWorker } from "../store/types";

const CreatePurchaseHistoryModal = () => {
    const [history] = useState<IPurchaseHistoriesWorker>({ id: "", userId: "", ticketId: "", purchasedAt: "" });
    const [error, setError] = useState<IPurchaseHistoryErrorType>({ userId: "", ticketId: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addPurchaseHistory } = useActions('purchaseHistory');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create history canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (history: IPurchaseHistoriesWorker) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addPurchaseHistory(history, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <PurchaseHistoryWorkerModal show={show} history={history} title='Create history' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreatePurchaseHistoryModal;