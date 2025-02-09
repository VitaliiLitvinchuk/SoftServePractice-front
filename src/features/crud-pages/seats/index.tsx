import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ISeat, ISeatWorker } from "./store/types";
import CreateSeatModal from "./modal-form/create";
import SeatWorkerModal, { ISeatErrorType } from "./modal-form";
import roles from "../../../utils/roles";

const operationAccess = roles.ADMIN;

const Seats = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<ISeatWorker | null>(null);
    const [error, setError] = useState<ISeatErrorType>({ row: "", number: "", hallId: "" });

    const { getSeats, updateSeat, deleteSeat } = useActions('seat');
    const { role } = useTypedSelector(state => state.sign);
    const { seats } = useTypedSelector(state => state.seat);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getSeats(source.token);

        return () => {
            source.cancel("Get seats canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteSeat(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((seat: ISeatWorker) => {
        setSelected(null);
        updateSeat(seat, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((seat: ISeat) => {
        const seatWorker: ISeatWorker = {
            id: seat.id,
            row: seat.row,
            number: seat.number,
            hallId: seat.hallId
        };

        setSelected(seatWorker);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Seats</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateSeatModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Id</th>
                        <th className="px-4" style={{ width: "10%" }}>Row</th>
                        <th className="px-4" style={{ width: "10%" }}>Number</th>
                        <th className="px-4" style={{ width: "30%" }}>Hall</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "30%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {seats.map(seat => (
                        <tr key={seat.id}>
                            {
                                seat.hall ?
                                    <>
                                        <td className="text-center align-middle"><span className="mx-2">{seat.id}</span></td>
                                        <td className="text-center align-middle"><span className="mx-2">{seat.row}</span></td>
                                        <td className="text-center align-middle"><span className="mx-2">{seat.number}</span></td>
                                        <td className="text-center align-middle"><span className="mx-2">{seat.hall.name}</span></td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td className="text-center align-middle">
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(seat)}>Edit</button>
                                                        </Col>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(seat.id)}>Delete</button>
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
                <SeatWorkerModal show={show} seat={selected} title="Edit seat" error={error} skip={["hallId"]} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default Seats;