import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IGenre } from "./store/types";
import CreateGenreModal from "./modal-form/create";
import GenreWorkerModal, { IGenreErrorType } from "./modal-form";
import roles from "../../../utils/roles";

const operationAccess = roles.ADMIN;

const Genres = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IGenre | null>(null);
    const [error, setError] = useState<IGenreErrorType>({ name: "" });

    const { getGenres, updateGenre, deleteGenre } = useActions('genre');
    const { role } = useTypedSelector(state => state.sign);
    const { genres } = useTypedSelector(state => state.genre);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getGenres(source.token);

        return () => {
            source.cancel("Get genres canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteGenre(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((genre: IGenre) => {
        setSelected(null);
        updateGenre(genre, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((genre: IGenre) => {
        setSelected(genre);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Genres</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateGenreModal />
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
                    {genres.slice(0, 100).map(genre => (
                        <tr key={genre.id}>
                            <td className="text-start"><span className="mx-2">{genre.id}</span></td>
                            <td className="text-start"><span className="mx-2">{genre.name}</span></td>
                            {
                                role?.includes(operationAccess) &&
                                <td>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(genre)}>Edit</button>
                                            </Col>
                                            <Col>
                                                <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(genre.id)}>Delete</button>
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
                <GenreWorkerModal show={show} genre={selected} title="Edit genre" error={error} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default Genres;