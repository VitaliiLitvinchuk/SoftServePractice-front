import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import React from "react";
import CreateMovieActorModal from "./modal-form/create";
import roles from "../../../utils/roles";
import { IMovieActorErrorType } from "./modal-form";

const operationAccess = roles.ADMIN;

const MoviesActors = React.memo(() => {
    const [, setError] = useState<IMovieActorErrorType>({ movieId: "", actorId: "" });

    const { getMoviesActors, deleteMovieActor } = useActions('movieActor');
    const { moviesActors } = useTypedSelector(state => state.movieActor);

    const { role } = useTypedSelector(state => state.sign);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getMoviesActors(source.token);

        return () => {
            source.cancel("Get movies actors canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((movieId: string, actorId: string) => {
        deleteMovieActor(movieId, actorId, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Movies Actors</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateMovieActorModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "30%" }}>Movie</th>
                        <th className="px-4" style={{ width: "30%" }}>Actor</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "40%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {moviesActors.map(movieActor => (
                        <tr key={movieActor.movieId + movieActor.actorId}>
                            {
                                movieActor.actor && movieActor.actor ?
                                    <>
                                        <td>{movieActor.movie?.name}</td>
                                        <td>{`${movieActor.actor?.name} ${movieActor.actor?.middlename} ${movieActor.actor?.surname}`}</td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td>
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(movieActor.movieId, movieActor.actorId)}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </td>
                                        }
                                    </> :
                                    <td colSpan={5}>
                                        Error movie or actor
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
});

export default MoviesActors;