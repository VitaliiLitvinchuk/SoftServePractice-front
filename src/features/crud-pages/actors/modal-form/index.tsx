import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { IActorWorker } from "../store/types";

export interface IActorErrorType extends IModalFormError {
    name: string
    surname: string
    middlename: string
    imageUrl: string
}

interface IProps {
    show: boolean
    actor: IActorWorker
    title: string
    error: IActorErrorType
    setError: (error: IActorErrorType) => void
    handleClose: () => void
    handleSubmit: (actor: IActorWorker) => void
}

const fields = ['name', 'surname', 'middlename', 'image'] as const;

const validation = {
    name: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => value?.trim().length < 256, message: "The {validationFor} is too long" },
    ] as IValidation[],
    surname: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => value?.trim().length < 256, message: "The {validationFor} is too long" },
    ] as IValidation[],
    middlename: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => value?.trim().length < 256, message: "The {validationFor} is too long" },
    ] as IValidation[],
}

const specifics = [
    { title: "Name", type: "text" },
    { title: "Surname", type: "text" },
    { title: "Middlename", type: "text" },
    { title: "Image", type: "file" },
] as IFieldSpecifics[];

const ActorWorkerModal = ({ show, actor, title, error, setError, handleClose, handleSubmit }: IProps) => {
    const [name, setName] = useState<string>(actor.name);
    const [surname, setSurname] = useState<string>(actor.surname);
    const [middlename, setMiddlename] = useState<string>(actor.middlename);
    const [image, setImage] = useState<File | null>(null);

    const setter = useMemo(() => {
        return [setName, setSurname, setMiddlename, setImage];
    }, []);

    const getter = useMemo(() => {
        return [name, surname, middlename, image];
    }, [image, middlename, name, surname]);

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
            handleSubmit={(e) => handleSubmit({ ...actor, ...e as unknown as IActorWorker })}
        />
    )
};

export default ActorWorkerModal;
