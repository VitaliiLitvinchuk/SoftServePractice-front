import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { IStatus } from "../store/types";

export interface IStatusErrorType extends IModalFormError {
    name: string
}

interface IProps {
    show: boolean
    status: IStatus
    title: string
    error: IStatusErrorType
    setError: (error: IStatusErrorType) => void
    handleClose: () => void
    handleSubmit: (status: IStatus) => void
}

const fields = ['name'] as const;

const validation = {
    name: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => value?.trim().length < 256, message: "The {validationFor} is too long" },
    ] as IValidation[],
}

const specifics = [
    { title: "Name", type: "text" },
] as IFieldSpecifics[];

const StatusWorkerModal = ({ show, status, title, error, setError, handleClose, handleSubmit }: IProps) => {
    const [name, setName] = useState<string>(status.name);

    const setter = useMemo(() => {
        return [setName];
    }, []);

    const getter = useMemo(() => {
        return [name];
    }, [name]);

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
            handleSubmit={(e) => handleSubmit({ ...status, ...e as unknown as IStatus })}
        />
    )
};

export default StatusWorkerModal;
