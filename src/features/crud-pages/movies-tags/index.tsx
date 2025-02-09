import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import React from "react";
import CreateMovieTagModal from "./modal-form/create";
import roles from "../../../utils/roles";
import { IMovieTagErrorType } from "./modal-form";

const operationAccess = roles.ADMIN;

const MoviesTags = React.memo(() => {
    const [, setError] = useState<IMovieTagErrorType>({ movieId: "", tagId: "" });

    const { getMoviesTags, deleteMovieTag } = useActions('movieTag');
    const { moviesTags } = useTypedSelector(state => state.movieTag);

    const { role } = useTypedSelector(state => state.sign);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getMoviesTags(source.token);

        return () => {
            source.cancel("Get movies tags canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((movieId: string, tagId: string) => {
        deleteMovieTag(movieId, tagId, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Movies Tags</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateMovieTagModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "30%" }}>Movie</th>
                        <th className="px-4" style={{ width: "30%" }}>Tag</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "40%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {moviesTags.map(movieTag => (
                        <tr key={movieTag.movieId + movieTag.tagId}>
                            {
                                movieTag.tag && movieTag.tag ?
                                    <>
                                        <td>{movieTag.movie?.name}</td>
                                        <td>{movieTag.tag?.name}</td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td>
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(movieTag.movieId, movieTag.tagId)}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </td>
                                        }
                                    </> :
                                    <td colSpan={5}>
                                        Error movie or tag
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
});

export default MoviesTags;