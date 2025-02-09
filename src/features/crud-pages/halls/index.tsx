import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IHall } from "./store/types";
import CreateHallModal from "./modal-form/create";
import HallWorkerModal, { IHallErrorType } from "./modal-form";
import roles from "../../../utils/roles";

const operationAccess = roles.ADMIN;

const Halls = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IHall | null>(null);
    const [error, setError] = useState<IHallErrorType>({ name: "", capacity: "" });

    const { getHalls, updateHall, deleteHall } = useActions('hall');
    const { role } = useTypedSelector(state => state.sign);
    const { halls } = useTypedSelector(state => state.hall);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getHalls(source.token);

        return () => {
            source.cancel("Get halls canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteHall(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((hall: IHall) => {
        setSelected(null);
        updateHall(hall, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((hall: IHall) => {
        setSelected(hall);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Halls</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateHallModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "30%" }}>Id</th>
                        <th className="px-4" style={{ width: "20%" }}>Name</th>
                        <th className="px-4" style={{ width: "20%" }}>Capacity</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "30%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {halls.slice(0, 100).map(hall => (
                        <tr key={hall.id}>
                            <td className="text-start"><span className="mx-2">{hall.id}</span></td>
                            <td className="text-start"><span className="mx-2">{hall.name}</span></td>
                            <td className="text-start"><span className="mx-2">{hall.capacity}</span></td>
                            {
                                role?.includes(operationAccess) &&
                                <td>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(hall)}>Edit</button>
                                            </Col>
                                            <Col>
                                                <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(hall.id)}>Delete</button>
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
                <HallWorkerModal show={show} hall={selected} title="Edit hall" error={error} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default Halls;