import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import React from "react";
import CreateTicketModal from "./modal-form/create";
import roles from "../../../utils/roles";
import TicketWorkerModal, { ITicketErrorType } from "./modal-form";
import { ITicket, ITicketWorker } from "./store/types";
import moment from "moment";

const operationAccess = roles.ADMIN;

const Tickets = React.memo(() => {
    const [error, setError] = useState<ITicketErrorType>({ sessionId: "", seatId: "", price: "" });
    const [selected, setSelected] = useState<ITicketWorker | null>(null);
    const [show, setShow] = useState(false);

    const { getTickets, deleteTicket, updateTicket } = useActions('ticket');
    const { tickets } = useTypedSelector(state => state.ticket);

    const { role } = useTypedSelector(state => state.sign);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getTickets(source.token);

        return () => {
            source.cancel("Get tickets canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteTicket(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((session: ITicket) => {
        setSelected(null);
        updateTicket(session as ITicketWorker, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((session: ITicket) => {
        setSelected(session as ITicketWorker);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Tickets</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateTicketModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Id</th>
                        <th className="px-4" style={{ width: "10%" }}>Price</th>
                        <th className="px-4" style={{ width: "10%" }}>Seat</th>
                        <th className="px-4" style={{ width: "20%" }}>Start At</th>
                        <th className="px-4" style={{ width: "20%" }}>End At</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "20%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            {
                                ticket.seat && ticket.session ?
                                    <>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.price}</td>
                                        <td>{ticket.seat.row}-{ticket.seat.number}</td>
                                        <td>{moment(ticket.session.startAt).format("YYYY-MM-DD HH:mm")}</td>
                                        <td>{moment(ticket.session.endAt).format("YYYY-MM-DD HH:mm")}</td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td>
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(ticket)}>Edit</button>
                                                        </Col>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(ticket.id)}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </td>
                                        }
                                    </> :
                                    <td colSpan={10}>
                                        Error
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                selected && show && role?.includes(operationAccess) &&
                <TicketWorkerModal show={show} ticket={selected} title="Edit movie rating" error={error} skip={["seatId", "sessionId"]} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default Tickets;