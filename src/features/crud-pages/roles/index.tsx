import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IRole } from "./store/types";
import CreateRoleModal from "./modal-form/create";
import RoleWorkerModal, { IRoleErrorType } from "./modal-form";
import roles from "../../../utils/roles";

const operationAccess = roles.ADMIN;

const Roles = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IRole | null>(null);
    const [error, setError] = useState<IRoleErrorType>({ name: "" });

    const { getRoles, updateRole, deleteRole } = useActions('role');
    const { role: access } = useTypedSelector(state => state.sign);
    const { roles } = useTypedSelector(state => state.role);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getRoles(source.token);

        return () => {
            source.cancel("Get roles canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteRole(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((role: IRole) => {
        setSelected(null);
        updateRole(role, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((role: IRole) => {
        setSelected(role);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Roles</h1>
            {
                access?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateRoleModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "40%" }}>Id</th>
                        <th className="px-4" style={{ width: "30%" }}>Name</th>
                        {
                            access?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "30%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {roles.slice(0, 100).map(role => (
                        <tr key={role.id}>
                            <td className="text-start"><span className="mx-2">{role.id}</span></td>
                            <td className="text-start"><span className="mx-2">{role.name}</span></td>
                            {
                                access?.includes(operationAccess) &&
                                <td>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(role)}>Edit</button>
                                            </Col>
                                            <Col>
                                                <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(role.id)}>Delete</button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                selected && show && access?.includes(operationAccess) &&
                <RoleWorkerModal show={show} role={selected} title="Edit role" error={error} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default Roles;