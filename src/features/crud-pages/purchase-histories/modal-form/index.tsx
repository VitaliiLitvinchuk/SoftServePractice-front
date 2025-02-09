import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IModalFormOption, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { IPurchaseHistoriesWorker } from "../store/types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import axios from "axios";

export interface IPurchaseHistoryErrorType extends IModalFormError {
    ticketId: string
    userId: string
}

interface IProps {
    show: boolean
    history: IPurchaseHistoriesWorker
    title: string
    error: IPurchaseHistoryErrorType
    setError: (error: IPurchaseHistoryErrorType) => void
    handleClose: () => void
    handleSubmit: (history: IPurchaseHistoriesWorker) => void
}

const fields = ['ticketId', 'userId'] as const;

const validation = {
    ticketId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    userId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Ticket", type: "select", options: [] },
    { title: "User", type: "select", options: [] },
] as IFieldSpecifics[];

const PurchaseHistoryWorkerModal = ({ show, history, title, error, setError, handleClose, handleSubmit }: IProps) => {
    const [ticketId, setTicketId] = useState<string>(history.ticketId);
    const [userId, setUserId] = useState<string>(history.userId);

    const { getTickets } = useActions("ticket");
    const { getUsers } = useActions("user");

    const { tickets } = useTypedSelector(state => state.ticket);
    const { users } = useTypedSelector(state => state.user);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!specifics[0].options?.length) {
            getTickets(source.token);
        }

        if (!specifics[1].options?.length) {
            getUsers(source.token);
        }

        return () => {
            source.cancel("Gets for tickets and users canceled");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = tickets.map(ticket => ({ value: ticket.id, label: ticket.id } as IModalFormOption));
    }, [tickets]);

    useEffect(() => {
        specifics[1].options = users.map(user => ({ value: user.id, label: user.email } as IModalFormOption));
    }, [users]);

    const setter = useMemo(() => {
        return [setTicketId, setUserId];
    }, []);

    const getter = useMemo(() => {
        return [ticketId, userId];
    }, [ticketId, userId]);

    return (
        <ModalForm
            show={show}
            title={title}
            getter={getter}
            setter={setter as Dispatch<SetStateAction<string | File | null>>[]}
            error={error}
            validation={validation}
            specifics={specifics}
            fields={fields}
            handleClose={handleClose}
            setError={setError as (error: IModalFormError) => void}
            handleSubmit={(e) => handleSubmit({ ...history, ...e as unknown as IPurchaseHistoriesWorker })}
        />
    )
};

export default PurchaseHistoryWorkerModal;
