import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from '../../../hooks/useActions';
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseViteUrl, notFoundImage } from "../../../utils/enviroment/settings";
import { id } from "../../../utils/url/search-keys/id/uuid";
import { isUuid } from "../../../utils/uuid/valid";
import Loader from "../../../components/loader";
import { Container, Table } from "react-bootstrap";
import converterUrlToImageLocation from "../../../utils/url/converters";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import secondsToTime from "../../../utils/date/seconds-to-time";
import { formatDate, formatDateWithTime } from '../../../utils/date/format';

const Movie = () => {
    const navigate = useNavigate();

    const { movie } = useTypedSelector(state => state.detailMovie);

    const { getMovie, clear } = useActions('detailMovie');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const uuid = searchParams.get(id);

        if (uuid && isUuid(uuid)) {
            getMovie(uuid);
        }
        else {
            navigate(`/${baseViteUrl}`);
        }

        return () => {
            clear();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sessionHandleClick = useCallback(async (uuid: string) => {
        const params = new URLSearchParams({ [id]: uuid });

        await navigate(`/session?${params}`);
    }, [navigate]);

    return (
        <>
            {
                movie && movie.actors && movie.genres && movie.tags && movie.sessions && movie.ratings ?
                    <>
                        <Container fluid className="mt-4 d-flex">
                            <div className="col-auto">
                                <div className="row">
                                    <img
                                        style={{ width: "400px", height: "600px", borderRadius: "50px" }}
                                        src={converterUrlToImageLocation(movie.imageUrl)}
                                        alt={notFoundImage} />
                                </div>
                            </div>
                            <div className="col px-4 pt-2">
                                <div className="row">
                                    <h1>{movie.name}</h1>
                                </div>
                                <div className="row">
                                    <p>{movie.description}</p>
                                </div>
                                <div className="row">
                                    <h4>Duration</h4>
                                    <p>
                                        {
                                            secondsToTime(Number(movie.duration))
                                        }
                                    </p>
                                </div>
                                <div className="row">
                                    <h4>Release Date</h4>
                                    <p>{formatDate(movie.releaseDate)}</p>
                                </div>
                                <div className="row">
                                    {/* TODO: trailer player */}
                                    <p>{movie.trailerUrl}</p>
                                </div>
                                <div className="row">
                                    <h4>Actors</h4>
                                    <p>
                                        {
                                            movie.actors.map(actor => `${actor.name} ${actor.middlename} ${actor.surname}`).join(', ')
                                        }
                                    </p>
                                </div>
                                <div className="row">
                                    <h4>Genres</h4>
                                    <p>
                                        {
                                            movie.genres.map(genre => genre.name).join(', ')
                                        }
                                    </p>
                                </div>
                                <div className="row">
                                    <h4>Tags</h4>
                                    <p>
                                        {
                                            movie.tags.map(tag => tag.name).join(', ')
                                        }
                                    </p>
                                </div>
                                <div className="row">
                                    <h4>Rate</h4>
                                    <div className="no-select">
                                        <ReactStars
                                            disabled
                                            count={5}
                                            value={movie.ratings.reduce((acc: number, x) => acc + Number(x.rate), 0) / (movie.ratings.length * 2)}
                                            size={30}
                                            edit={false}
                                            isHalf={true}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row px-2">
                                    <h2 className="text-center">Sessions</h2>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Hall</th>
                                                <th>Start</th>
                                                <th>End</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                movie.sessions.map(session =>
                                                    <tr key={session.id} onClick={() => sessionHandleClick(session.id)}>
                                                        <td>{session.hall?.name}</td>
                                                        <td>{formatDateWithTime(session.startAt)}</td>
                                                        <td>{formatDateWithTime(session.endAt)}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Container>
                    </>
                    :
                    <div className="position-absolute text-center top-50 start-50 translate-middle">
                        <Loader visible={true} />
                    </div>
            }
        </>
    );
}

export default Movie;