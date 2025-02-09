import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CreateStatusModal from "./modal-form/create";
import roles from "../../../utils/roles";
import StatusWorkerModal, { IStatusErrorType } from "./modal-form";
import { IStatus } from "./store/types";

const operationAccess = roles.ADMIN;

const Statuses = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IStatus | null>(null);
    const [error, setError] = useState<IStatusErrorType>({ name: "" });

    const { getStatuses, updateStatus, deleteStatus } = useActions('status');
    const { role } = useTypedSelector(state => state.sign);
    const { statuses } = useTypedSelector(state => state.status);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getStatuses(source.token);

        return () => {
            source.cancel("Get statuses canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteStatus(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((status: IStatus) => {
        setSelected(null);
        updateStatus(status, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((status: IStatus) => {
        setSelected(status);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Statuses</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateStatusModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "40%" }}>Id</th>
                        <th className="px-4" style={{ width: "30%" }}>Name</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "30%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {statuses.slice(0, 100).map(status => (
                        <tr key={status.id}>
                            <td className="text-start"><span className="mx-2">{status.id}</span></td>
                            <td className="text-start"><span className="mx-2">{status.name}</span></td>
                            {
                                role?.includes(operationAccess) &&
                                <td>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(status)}>Edit</button>
                                            </Col>
                                            <Col>
                                                <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(status.id)}>Delete</button>
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
                selected && show && role?.includes(operationAccess) &&
                <StatusWorkerModal show={show} status={selected} title="Edit status" error={error} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default Statuses;