import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { ITag } from "../store/types";

export interface ITagErrorType extends IModalFormError {
    name: string
}

interface IProps {
    show: boolean
    tag: ITag
    title: string
    error: ITagErrorType
    setError: (error: ITagErrorType) => void
    handleClose: () => void
    handleSubmit: (tag: ITag) => void
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

const TagWorkerModal = ({ show, tag, title, error, setError, handleClose, handleSubmit }: IProps) => {
    const [name, setName] = useState<string>(tag.name);

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
            handleSubmit={(e) => handleSubmit({ ...tag, ...e as unknown as ITag })}
        />
    )
};

export default TagWorkerModal;
