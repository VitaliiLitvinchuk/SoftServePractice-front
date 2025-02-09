import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IUser, IUserWorker } from "./store/types";
import UserWorkerModal, { IUserErrorType } from "./modal-form";
import roles from "../../../utils/roles";

const operationAccess = roles.ADMIN;

const Users = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IUserWorker | null>(null);
    const [error, setError] = useState<IUserErrorType>({ roleId: "" });

    const { getUsers, updateUser, deleteUser } = useActions('user');
    const { role } = useTypedSelector(state => state.sign);
    const { users } = useTypedSelector(state => state.user);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getUsers(source.token);

        return () => {
            source.cancel("Get users canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteUser(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback(async (user: IUserWorker) => {
        setSelected(null);
        await updateUser(user, setError);
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((user: IUser) => {
        const userWorker: IUserWorker = {
            id: user.id,
            roleId: user.roleId
        };

        setSelected(userWorker);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Users</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "30%" }}>Id</th>
                        <th className="px-4" style={{ width: "20%" }}>Email</th>
                        <th className="px-4" style={{ width: "20%" }}>Role</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "30%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            {
                                user.role ?
                                    <>
                                        <td className="align-middle"><span className="mx-2">{user.id}</span></td>
                                        <td className="align-middle"><span className="mx-2">{user.email}</span></td>
                                        <td className="align-middle"><span className="mx-2">{user.role.name}</span></td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td className="align-middle">
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(user)}>Edit</button>
                                                        </Col>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(user.id)}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </td>
                                        }
                                    </> :
                                    <td colSpan={5}>
                                        Error hall
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                selected && show && role?.includes(operationAccess) &&
                <UserWorkerModal show={show} user={selected} title="Edit user" error={error} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default Users;