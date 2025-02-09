import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import React from "react";
import CreateMovieRatingModal from "./modal-form/create";
import roles from "../../../utils/roles";
import MovieRatingWorkerModal, { IMovieRatingErrorType } from "./modal-form";
import { IMovieRating, IMovieRatingWorker } from "./store/types";

const operationAccess = roles.ADMIN;

const MoviesRatings = React.memo(() => {
    const [error, setError] = useState<IMovieRatingErrorType>({ movieId: "", userId: "", rating: "" });
    const [selected, setSelected] = useState<IMovieRating | null>(null);
    const [show, setShow] = useState(false);

    const { getMoviesRatings, deleteMoviesRating, updateMoviesRating } = useActions('movieRating');
    const { moviesRatings } = useTypedSelector(state => state.movieRating);

    const { role } = useTypedSelector(state => state.sign);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getMoviesRatings(source.token);

        return () => {
            source.cancel("Get movies ratings canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((movieId: string, userId: string) => {
        deleteMoviesRating(movieId, userId, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((movieRating: IMovieRating) => {
        setSelected(null);
        updateMoviesRating(movieRating as IMovieRatingWorker, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((movieRating: IMovieRating) => {
        setSelected(movieRating);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Movies Ratings</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateMovieRatingModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Movie</th>
                        <th className="px-4" style={{ width: "20%" }}>User</th>
                        <th className="px-4" style={{ width: "20%" }}>Rating</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "40%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {moviesRatings.map(movieRating => (
                        <tr key={movieRating.movieId + movieRating.userId}>
                            {
                                movieRating.movie && movieRating.user ?
                                    <>
                                        <td>{movieRating.movie.name}</td>
                                        <td>{movieRating.user.email}</td>
                                        <td>{movieRating.rate}</td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td>
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(movieRating)}>Edit</button>
                                                        </Col>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(movieRating.movieId, movieRating.userId)}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </td>
                                        }
                                    </> :
                                    <td colSpan={5}>
                                        Error movie or user
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                selected && show && role?.includes(operationAccess) &&
                <MovieRatingWorkerModal show={show} movieRating={selected} title="Edit movie rating" error={error} skip={["movieId", "userId"]} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    )
});

export default MoviesRatings;