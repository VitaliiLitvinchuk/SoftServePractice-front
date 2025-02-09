import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { IMovie, IMovieWorker } from "../store/types";

export interface IMovieErrorType extends IModalFormError {
    name: string
    duration: string
    trailerUrl: string
    imageUrl: string
    description: string
    releaseDate: string
}

interface IProps {
    show: boolean
    movie: IMovieWorker
    title: string
    error: IMovieErrorType
    setError: (error: IMovieErrorType) => void
    handleClose: () => void
    handleSubmit: (movie: IMovieWorker) => void
}

const fields = ['name', 'duration', 'trailerUrl', 'image', 'description', 'releaseDate'] as const;

const validation = {
    name: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => value.trim().length < 256, message: "The {validationFor} is too long" },
    ] as IValidation[],
    duration: [
        { func: (value: string) => Number.isInteger(+value), message: "The {validationFor} must be an integer" },
        { func: (value: string) => +value > 0, message: "The {validationFor} must be greater than 0" },
    ] as IValidation[],
    description: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    releaseDate: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Name", type: "text" },
    { title: "Duration", type: "number" },
    { title: "Trailer url", type: "text" },
    { title: "Image", type: "file" },
    { title: "Description", type: "text" },
    { title: "Release", type: "date" },
] as IFieldSpecifics[];

const MovieWorkerModal = ({ show, movie, title, error, setError, handleClose, handleSubmit }: IProps) => {
    const [name, setName] = useState<string>(movie.name);
    const [duration, setDuration] = useState<string>(movie.duration);
    const [trailerUrl, setTrailerUrl] = useState<string>(movie.trailerUrl);
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState<string>(movie.description);
    const [releaseDate, setReleaseDate] = useState<string>(movie.releaseDate);

    const setter = useMemo(() => {
        return [setName, setDuration, setTrailerUrl, setImage, setDescription, setReleaseDate];
    }, []);

    const getter = useMemo(() => {
        return [name, duration, trailerUrl, image, description, releaseDate];
    }, [description, duration, image, name, releaseDate, trailerUrl]);

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
            handleSubmit={(e) => handleSubmit({ ...movie, ...e as unknown as IMovie })}
        />
    )
};

export default MovieWorkerModal;
