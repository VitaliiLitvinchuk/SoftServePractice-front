import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { IRole } from "../store/types";

export interface IRoleErrorType extends IModalFormError {
    name: string
}

interface IProps {
    show: boolean
    role: IRole
    title: string
    error: IRoleErrorType
    setError: (error: IRoleErrorType) => void
    handleClose: () => void
    handleSubmit: (role: IRole) => void
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

const RoleWorkerModal = ({ show, role, title, error, setError, handleClose, handleSubmit }: IProps) => {
    const [name, setName] = useState<string>(role.name);

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
            handleSubmit={(e) => handleSubmit({ ...role, ...e as unknown as IRole })}
        />
    )
};

export default RoleWorkerModal;
