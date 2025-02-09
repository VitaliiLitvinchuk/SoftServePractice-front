import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { IHall } from "../store/types";

export interface IHallErrorType extends IModalFormError {
    name: string
    capacity: string
}

interface IProps {
    show: boolean
    hall: IHall
    title: string
    error: IHallErrorType
    setError: (error: IHallErrorType) => void
    handleClose: () => void
    handleSubmit: (hall: IHall) => void
}

const fields = ['name', 'capacity'] as const;

const validation = {
    name: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => value.trim().length < 256, message: "The {validationFor} is too long" },
    ] as IValidation[],
    capacity: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => Number.isInteger(+value), message: "The {validationFor} must be an integer" },
        { func: (value: string) => +value >= 0, message: "The {validationFor} must be greater than 0" },
    ] as IValidation[],
}

const specifics = [
    { title: "Name", type: "text" },
    { title: "Capacity", type: "number" },
] as IFieldSpecifics[];

const HallWorkerModal = ({ show, hall, title, error, setError, handleClose, handleSubmit }: IProps) => {
    const [name, setName] = useState<string>(hall.name);
    const [capacity, setCapacity] = useState<string>(hall.capacity);

    const setter = useMemo(() => {
        return [setName, setCapacity];
    }, []);

    const getter = useMemo(() => {
        return [name, capacity];
    }, [name, capacity]);

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
            handleSubmit={(e) => handleSubmit({ ...hall, ...e as unknown as IHall })}
        />
    )
};

export default HallWorkerModal;
