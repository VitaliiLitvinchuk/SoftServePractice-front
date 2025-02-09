import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFieldSpecifics, IModalFormError, IModalFormOption, IValidation } from "../../../../components/modal-form/types";
import ModalForm from "../../../../components/modal-form";
import { IUserWorker } from "../store/types";
import axios from "axios";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

export interface IUserErrorType extends IModalFormError {
    roleId: string
}

interface IProps {
    show: boolean
    user: IUserWorker
    title: string
    error: IUserErrorType
    setError: (error: IUserErrorType) => void
    handleClose: () => void
    handleSubmit: (user: IUserWorker) => void
}

const fields = ['roleId'] as const;

const validation = {
    roleId: [
        { func: (value: string) => value?.trim().length > 0, message: "The {validationFor} is required" },
    ] as IValidation[],
}

const specifics = [
    { title: "Role", type: "select", options: [] },
] as IFieldSpecifics[];

const UserWorkerModal = ({ show, user, title, error, setError, handleClose, handleSubmit }: IProps) => {
    const [roleId, setRoleId] = useState<string>(user.roleId);

    const { getRoles } = useActions('role');

    const { roles } = useTypedSelector(state => state.role);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!specifics[0].options?.length) {
            getRoles(source.token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        specifics[0].options = roles.map(role => ({ value: role.id, label: role.name } as IModalFormOption));
    }, [roles]);

    const setter = useMemo(() => {
        return [setRoleId];
    }, []);

    const getter = useMemo(() => {
        return [roleId];
    }, [roleId]);

    return (
        <>
            {
                specifics[0].options?.length &&
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
                    handleSubmit={(e) => handleSubmit({ ...user, ...e as unknown as IUserWorker })}
                />
            }
        </>
    )
};
export default UserWorkerModal;
