import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import React from "react";
import CreateSessionModal from "./modal-form/create";
import roles from "../../../utils/roles";
import SessionWorkerModal, { ISessionErrorType } from "./modal-form";
import { ISession, ISessionWorker } from "./store/types";
import moment from "moment";

const operationAccess = roles.ADMIN;

const Sessions = React.memo(() => {
    const [error, setError] = useState<ISessionErrorType>({ statusId: "", movieId: "", hallId: "", startAt: "", endAt: "" });
    const [selected, setSelected] = useState<ISessionWorker | null>(null);
    const [show, setShow] = useState(false);

    const { getSessions, deleteSession, updateSession } = useActions('session');
    const { sessions } = useTypedSelector(state => state.session);

    const { role } = useTypedSelector(state => state.sign);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getSessions(source.token);

        return () => {
            source.cancel("Get tickets canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteSession(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((session: ISession) => {
        setSelected(null);
        updateSession(session as ISessionWorker, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((session: ISession) => {
        setSelected(session as ISessionWorker);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Sessions</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateSessionModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Id</th>
                        <th className="px-4" style={{ width: "10%" }}>Movie</th>
                        <th className="px-4" style={{ width: "10%" }}>Status</th>
                        <th className="px-4" style={{ width: "10%" }}>Hall</th>
                        <th className="px-4" style={{ width: "10%" }}>Start At</th>
                        <th className="px-4" style={{ width: "10%" }}>End At</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "20%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {sessions.map(session => (
                        <tr key={session.id}>
                            {
                                session.hall && session.status && session.movie ?
                                    <>
                                        <td>{session.id}</td>
                                        <td>{session.movie.name}</td>
                                        <td>{session.status.name}</td>
                                        <td>{session.hall.name}</td>
                                        <td>{moment(session.startAt).format("YYYY-MM-DD HH:mm")}</td>
                                        <td>{moment(session.endAt).format("YYYY-MM-DD HH:mm")}</td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td>
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(session)}>Edit</button>
                                                        </Col>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(session.id)}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </td>
                                        }
                                    </> :
                                    <td colSpan={10}>
                                        Error hall or status or movie
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                selected && show && role?.includes(operationAccess) &&
                <SessionWorkerModal show={show} session={selected} title="Edit movie rating" error={error} skip={[]} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default Sessions;