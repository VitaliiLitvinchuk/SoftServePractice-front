import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IModalFormOption, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { ISessionWorker } from "../store/types";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import axios from "axios";

export interface ISessionErrorType extends IModalFormError {
    statusId: string
    movieId: string
    hallId: string
    startAt: string
    endAt: string
}

interface IProps {
    show: boolean
    session: ISessionWorker
    title: string
    error: ISessionErrorType
    skip: Array<typeof fields[number]>
    setError: (error: ISessionErrorType) => void
    handleClose: () => void
    handleSubmit: (session: ISessionWorker) => void
}

const fields = ["statusId", "movieId", "hallId", "startAt", "endAt"] as const;

const validation = {
    statusId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    movieId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    hallId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
    startAt: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Status", type: "select", options: [] },
    { title: "Movie", type: "select", options: [] },
    { title: "Hall", type: "select", options: [] },
    { title: "Start at", type: "datetime-local" },
    { title: "End at", type: "datetime-local" },
] as IFieldSpecifics[];

const SessionWorkerModal = ({ show, session, title, error, skip, setError, handleClose, handleSubmit }: IProps) => {
    const [status, setStatus] = useState<string>(session.statusId);
    const [movie, setMovie] = useState<string>(session.movieId);
    const [hall, setHall] = useState<string>(session.hallId);
    const [startAt, setStartAt] = useState<string>(session.startAt);
    const [endAt, setEndAt] = useState<string>(session.endAt);

    const [skipSequence, setSkipSequence] = useState<number[]>([]);

    const { getStatuses } = useActions("status");
    const { getMovies } = useActions("movie");
    const { getHalls } = useActions("hall");

    const { statuses } = useTypedSelector(state => state.status);
    const { movies } = useTypedSelector(state => state.movie);
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

        if (!skip.includes(fields[0]) && !specifics[0].options?.length) {
            getStatuses(source.token);
        }

        if (!skip.includes(fields[1]) && !specifics[1].options?.length) {
            getMovies(source.token);
        }

        if (!skip.includes(fields[2]) && !specifics[2].options?.length) {
            getHalls(source.token);
        }

        return () => {
            source.cancel("Gets for movies, halls and sessions canceled");

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = statuses.map(status => ({ value: status.id, label: status.name } as IModalFormOption));
    }, [statuses]);

    useEffect(() => {
        specifics[1].options = movies.map(movie => ({ value: movie.id, label: movie.name } as IModalFormOption));
    }, [movies]);

    useEffect(() => {
        specifics[2].options = halls.map(hall => ({ value: hall.id, label: hall.name } as IModalFormOption));
    }, [halls]);

    const setter = useMemo(() => {
        return [setStatus, setMovie, setHall, setStartAt, setEndAt];
    }, []);

    const getter = useMemo(() => {
        return [status, movie, hall, startAt, endAt];
    }, [status, movie, hall, startAt, endAt]);

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
            handleSubmit={(e) => handleSubmit({ ...session, ...e as ISessionWorker })}
        />
    )
};

export default SessionWorkerModal;
