import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IActor, IActorWorker } from "./store/types";
import CreateActorModal from "./modal-form/create";
import ActorWorkerModal, { IActorErrorType } from "./modal-form";
import roles from "../../../utils/roles";
import converterUrlToImageLocation from "../../../utils/url/converters";

const operationAccess = roles.ADMIN;

const Actors = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IActorWorker | null>(null);
    const [error, setError] = useState<IActorErrorType>({ name: "", surname: "", middlename: "", imageUrl: "" });

    const { getActors, updateActor, deleteActor } = useActions('actor');
    const { role } = useTypedSelector(state => state.sign);
    const { actors } = useTypedSelector(state => state.actor);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getActors(source.token);

        return () => {
            source.cancel("Get actors canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteActor(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((actor: IActorWorker) => {
        setSelected(null);
        updateActor(actor, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((actor: IActor) => {
        const actorWorker: IActorWorker = {
            id: actor.id,
            name: actor.name,
            surname: actor.surname,
            middlename: actor.middlename,
            image: null
        };

        setSelected(actorWorker);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Actors</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateActorModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Id</th>
                        <th className="px-4" style={{ width: "10%" }}>Name</th>
                        <th className="px-4" style={{ width: "10%" }}>Surname</th>
                        <th className="px-4" style={{ width: "10%" }}>Middlename</th>
                        <th className="px-4" style={{ width: "20%" }}>Image</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "30%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {actors.slice(0, 100).map(actor => (
                        <tr key={actor.id}>
                            <td className="text-center align-middle"><span className="mx-2">{actor.id}</span></td>
                            <td className="text-center align-middle"><span className="mx-2">{actor.name}</span></td>
                            <td className="text-center align-middle"><span className="mx-2">{actor.surname}</span></td>
                            <td className="text-center align-middle"><span className="mx-2">{actor.middlename}</span></td>
                            <td className="text-center align-middle"><span className="mx-2"><img className="w-50" src={converterUrlToImageLocation(actor.imageUrl)} alt="Not Found" /></span></td>
                            {
                                role?.includes(operationAccess) &&
                                <td className="text-center align-middle">
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(actor)}>Edit</button>
                                            </Col>
                                            <Col>
                                                <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(actor.id)}>Delete</button>
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
                <ActorWorkerModal show={show} actor={selected} title="Edit actor" error={error} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default Actors;