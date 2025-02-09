import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import React from "react";
import CreateGenreTagModal from "./modal-form/create";
import roles from "../../../utils/roles";
import { IGenreTagErrorType } from "./modal-form";

const operationAccess = roles.ADMIN;

const GenresTags = React.memo(() => {
    const [, setError] = useState<IGenreTagErrorType>({ genreId: "", tagId: "" });

    const { getGenresTags, deleteGenreTag } = useActions('genreTag');
    const { genresTags } = useTypedSelector(state => state.genreTag);

    const { role } = useTypedSelector(state => state.sign);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getGenresTags(source.token);

        return () => {
            source.cancel("Get genres tags canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((genreId: string, tagId: string) => {
        deleteGenreTag(genreId, tagId, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Genres Tags</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateGenreTagModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "30%" }}>Genre</th>
                        <th className="px-4" style={{ width: "30%" }}>Tag</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "40%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {genresTags.map(genreTag => (
                        <tr key={genreTag.genreId + genreTag.tagId}>
                            {
                                genreTag.tag && genreTag.tag ?
                                    <>
                                        <td>{genreTag.genre?.name}</td>
                                        <td>{genreTag.tag?.name}</td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td>
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(genreTag.genreId, genreTag.tagId)}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </td>
                                        }
                                    </> :
                                    <td colSpan={5}>
                                        Error genre or tag
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
});

export default GenresTags;