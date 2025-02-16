import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CreatePurchaseHistoryModal from "./modal-form/create";
import { IPurchaseHistoryErrorType } from "./modal-form";
import roles from "../../../utils/roles";
import { formatDateWithTime } from "../../../utils/date/format";

const operationAccess = roles.ADMIN;

const PurchaseHistories = React.memo(() => {
    const [, setError] = useState<IPurchaseHistoryErrorType>({ userId: "", ticketId: "" });

    const { getPurchaseHistories, deletePurchaseHistory } = useActions('purchaseHistory');
    const { role } = useTypedSelector(state => state.sign);
    const { histories } = useTypedSelector(state => state.purchaseHistory);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getPurchaseHistories(source.token);

        return () => {
            source.cancel("Get histories canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deletePurchaseHistory(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Purchase Histories</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreatePurchaseHistoryModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Id</th>
                        <th className="px-4" style={{ width: "20%" }}>User</th>
                        <th className="px-4" style={{ width: "10%" }}>Ticket Price</th>
                        <th className="px-4" style={{ width: "20%" }}>Parchased At</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "30%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {histories.slice(0, 100).map(history => (
                        <tr key={history.id}>
                            {
                                history.user && history.ticket ?
                                    <>
                                        <td className="text-start"><span className="mx-2">{history.id}</span></td>
                                        <td className="text-start"><span className="mx-2">{history.user.email}</span></td>
                                        <td className="text-start"><span className="mx-2">{history.ticket.price}</span></td>
                                        <td className="text-start"><span className="mx-2">{formatDateWithTime(history.purchasedAt)}</span></td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td>
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(history.id)}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </td>
                                        }
                                    </> :
                                    <td colSpan={5}>Error user or ticket</td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
});

export default PurchaseHistories;