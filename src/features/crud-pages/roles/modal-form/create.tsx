import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import RoleWorkerModal, { IRoleErrorType } from ".";
import { IRole } from "../store/types";

const CreateRoleModal = () => {
    const [role] = useState<IRole>({ id: "", name: "" });
    const [error, setError] = useState<IRoleErrorType>({ name: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addRole } = useActions('role');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create role canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (role: IRole) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addRole(role, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <RoleWorkerModal show={show} role={role} title='Create role' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateRoleModal;