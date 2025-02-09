import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import React from "react";
import CreateMovieGenreModal from "./modal-form/create";
import roles from "../../../utils/roles";
import { IMovieGenreErrorType } from "./modal-form";

const operationAccess = roles.ADMIN;

const MoviesGenres = React.memo(() => {
    const [, setError] = useState<IMovieGenreErrorType>({ movieId: "", genreId: "" });

    const { getMoviesGenres, deleteMovieGenre } = useActions('movieGenre');
    const { moviesGenres } = useTypedSelector(state => state.movieGenre);

    const { role } = useTypedSelector(state => state.sign);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getMoviesGenres(source.token);

        return () => {
            source.cancel("Get movies genres canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((movieId: string, genreId: string) => {
        deleteMovieGenre(movieId, genreId, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Movies Genres</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateMovieGenreModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "30%" }}>Movie</th>
                        <th className="px-4" style={{ width: "30%" }}>Genre</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "40%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {moviesGenres.map(movieGenre => (
                        <tr key={movieGenre.movieId + movieGenre.genreId}>
                            {
                                movieGenre.movie && movieGenre.genre ?
                                    <>
                                        <td>{movieGenre.movie.name}</td>
                                        <td>{movieGenre.genre.name}</td>
                                        {
                                            role?.includes(operationAccess) &&
                                            <td>
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(movieGenre.movieId, movieGenre.genreId)}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </td>
                                        }
                                    </> :
                                    <td colSpan={5}>
                                        Error movie or genre
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
});

export default MoviesGenres;