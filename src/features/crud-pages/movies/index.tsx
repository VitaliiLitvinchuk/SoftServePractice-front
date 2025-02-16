import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IMovie, IMovieWorker } from "./store/types";
import CreateMovieModal from "./modal-form/create";
import MovieWorkerModal, { IMovieErrorType } from "./modal-form";
import roles from "../../../utils/roles";
import converterUrlToImageLocation from "../../../utils/url/converters";
import { formatDate } from "../../../utils/date/format";

const operationAccess = roles.ADMIN;

const Movies = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<IMovieWorker | null>(null);
    const [error, setError] = useState<IMovieErrorType>({ name: "", duration: "", trailerUrl: "", imageUrl: "", description: "", releaseDate: "" });

    const { getMovies, updateMovie, deleteMovie } = useActions('movie');
    const { role } = useTypedSelector(state => state.sign);
    const { movies } = useTypedSelector(state => state.movie);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getMovies(source.token);

        return () => {
            source.cancel("Get movies canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteMovie(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((movie: IMovieWorker) => {
        setSelected(null);
        updateMovie(movie, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((movie: IMovie) => {
        const movieWorker: IMovieWorker = {
            id: movie.id,
            name: movie.name,
            duration: movie.duration,
            trailerUrl: movie.trailerUrl,
            description: movie.description,
            releaseDate: movie.releaseDate,
            image: null
        };

        setSelected(movieWorker);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Movies</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateMovieModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "20%" }}>Id</th>
                        <th className="px-4" style={{ width: "10%" }}>Name</th>
                        <th className="px-4" style={{ width: "10%" }}>Duration</th>
                        <th className="px-4" style={{ width: "10%" }}>Image</th>
                        <th className="px-4" style={{ width: "10%" }}>Description</th>
                        <th className="px-4" style={{ width: "10%" }}>Realese Date</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "20%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {movies.slice(0, 100).map(movie => (
                        <tr key={movie.id}>
                            <td className="text-center align-middle"><span className="mx-2">{movie.id}</span></td>
                            <td className="text-center align-middle"><span className="mx-2">{movie.name}</span></td>
                            <td className="text-center align-middle"><span className="mx-2">{movie.duration}</span></td>
                            <td className="text-center align-middle"><span className="mx-2"><img className="w-50" src={converterUrlToImageLocation(movie.imageUrl)} alt="Not Found" /></span></td>
                            <td className="text-center align-middle"><span className="mx-2">{movie.description}</span></td>
                            <td className="text-center align-middle"><span className="mx-2">{formatDate(movie.releaseDate)}</span></td>
                            {
                                role?.includes(operationAccess) &&
                                <td className="text-center align-middle">
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(movie)}>Edit</button>
                                            </Col>
                                            <Col>
                                                <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(movie.id)}>Delete</button>
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
                <MovieWorkerModal show={show} movie={selected} title="Edit movie" error={error} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default Movies;