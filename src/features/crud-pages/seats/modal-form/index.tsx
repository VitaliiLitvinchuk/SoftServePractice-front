import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IModalFormOption, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { ISeatWorker } from "../store/types";
import axios from "axios";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

export interface ISeatErrorType extends IModalFormError {
    row: string
    number: string
    hallId: string
}

interface IProps {
    show: boolean
    seat: ISeatWorker
    title: string
    error: ISeatErrorType
    skip: Array<typeof fields[number]>
    setError: (error: ISeatErrorType) => void
    handleClose: () => void
    handleSubmit: (seat: ISeatWorker) => void
}

const fields = ['row', 'number', 'hallId'] as const;

const validation = {
    row: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => Number.isInteger(+value), message: "The {validationFor} must be an integer" },
        { func: (value: string) => +value >= 0, message: "The {validationFor} must be greater than 0" },
    ] as IValidation[],
    number: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => Number.isInteger(+value), message: "The {validationFor} must be an integer" },
        { func: (value: string) => +value >= 0, message: "The {validationFor} must be greater than 0" },
    ] as IValidation[],
    hallId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Row", type: "number" },
    { title: "Number", type: "number" },
    { title: "Hall", type: "select", options: [] },
] as IFieldSpecifics[];

const SeatWorkerModal = ({ show, seat, title, error, skip, setError, handleClose, handleSubmit }: IProps) => {
    const [row, setRow] = useState<string>(seat.row);
    const [number, setNumber] = useState<string>(seat.number);
    const [hallId, setHallId] = useState<string>(seat.hallId);

    const [skipSequence, setSkipSequence] = useState<number[]>([]);

    const { getHalls } = useActions('hall');

    const { halls } = useTypedSelector(state => state.hall);

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

        if (!skip.includes(fields[2]) && !specifics[2].options?.length) {
            getHalls(source.token);
        }

        return () => {
            source.cancel("Get for halls canceled");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[2].options = halls.map(hall => ({ value: hall.id, label: hall.name } as IModalFormOption));
    }, [halls]);

    const setter = useMemo(() => {
        return [setRow, setNumber, setHallId];
    }, []);

    const getter = useMemo(() => {
        return [row, number, hallId];
    }, [row, number, hallId]);

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
            handleSubmit={(e) => handleSubmit({ ...seat, ...e as unknown as ISeatWorker })}
        />
    )
};
export default SeatWorkerModal;
