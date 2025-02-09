import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IModalFormOption, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { ITicketWorker } from "../store/types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import axios from "axios";

export interface ITicketErrorType extends IModalFormError {
    sessionId: string
    seatId: string
    price: string
}

interface IProps {
    show: boolean
    ticket: ITicketWorker
    title: string
    error: ITicketErrorType
    skip: Array<typeof fields[number]>
    setError: (error: ITicketErrorType) => void
    handleClose: () => void
    handleSubmit: (ticket: ITicketWorker) => void
}

const fields = ["sessionId", "seatId", "price"] as const;

const validation = {
    sessionId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    seatId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    price: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => Number.isInteger(+value), message: "The {validationFor} must be an integer" },
        { func: (value: string) => +value > 0, message: "The {validationFor} must be greater than 0" },
    ] as IValidation[]
}

const specifics = [
    { title: "Session", type: "select", options: [] },
    { title: "Seat", type: "select", options: [] },
    { title: "Price", type: "number" },
] as IFieldSpecifics[];

const TicketWorkerModal = ({ show, ticket, title, error, skip, setError, handleClose, handleSubmit }: IProps) => {
    const [sessionId, setSessionId] = useState<string>(ticket.sessionId);
    const [seatId, setSeatId] = useState<string>(ticket.seatId);
    const [price, setPrice] = useState<string>(ticket.price);

    const [skipSequence, setSkipSequence] = useState<number[]>([]);

    const { getSessions } = useActions("session");
    const { getSeats } = useActions("seat");

    const { sessions } = useTypedSelector(state => state.session);
    const { seats } = useTypedSelector(state => state.seat);

    useEffect(() => {
        const seq: number[] = [];

        skip.forEach((item) => {
            if (fields.includes(item)) {
                seq.push(fields.indexOf(item));
            }
        });

        setSkipSequence(seq);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!skip.includes(fields[0]) && !specifics[0].options?.length) {
            getSessions(source.token);
        }

        if (!skip.includes(fields[1]) && !specifics[1].options?.length) {
            getSeats(source.token);
        }

        return () => {
            source.cancel("Gets for sessions and seats canceled");

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = sessions.map(session => ({ value: session.id, label: session.id } as IModalFormOption));
    }, [sessions]);

    useEffect(() => {
        specifics[1].options = seats.map(seat => ({ value: seat.id, label: `${seat.row}-${seat.number}` } as IModalFormOption));
    }, [seats]);

    const setter = useMemo(() => {
        return [setSessionId, setSeatId, setPrice];
    }, []);

    const getter = useMemo(() => {
        return [sessionId, seatId, price];
    }, [price, seatId, sessionId]);

    return (
        <ModalForm
            show={show}
            title={title}
            getter={getter}
            setter={setter as Dispatch<SetStateAction<string | File | null>>[]}
            error={error}
            validation={validation}
            specifics={specifics.filter((_, index) => !skipSequence.includes(index))}
            fields={fields.filter(field => !skip.includes(field))}
            handleClose={handleClose}
            setError={setError as (error: IModalFormError) => void}
            handleSubmit={(e) => handleSubmit({ ...ticket, ...e as ITicketWorker })}
        />
    )
};

export default TicketWorkerModal;
