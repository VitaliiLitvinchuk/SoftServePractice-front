import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { IGenre } from "../store/types";

export interface IGenreErrorType extends IModalFormError {
    name: string
}

interface IProps {
    show: boolean
    genre: IGenre
    title: string
    error: IGenreErrorType
    setError: (error: IGenreErrorType) => void
    handleClose: () => void
    handleSubmit: (genre: IGenre) => void
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

const GenreWorkerModal = ({ show, genre, title, error, setError, handleClose, handleSubmit }: IProps) => {
    const [name, setName] = useState<string>(genre.name);

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
            handleSubmit={(e) => handleSubmit({ ...genre, ...e as unknown as IGenre })}
        />
    )
};

export default GenreWorkerModal;
