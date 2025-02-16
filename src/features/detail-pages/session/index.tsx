import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { useCallback, useEffect } from "react";
import { id } from "../../../utils/url/search-keys/id/uuid";
import { isUuid } from "../../../utils/uuid/valid";
import Loader from "../../../components/loader";
import { Container, Row } from "react-bootstrap";
import { formatDateWithTime } from "../../../utils/date/format";
import SeatsVisualization from "../../../components/seats";
import { ISeat } from "../../crud-pages/seats/store/types";

const Session = () => {
    const navigate = useNavigate();

    const { session } = useTypedSelector(state => state.detailSession);
    const { isLoggined } = useTypedSelector(state => state.sign);

    const { getSession, createPurchase, clear } = useActions('detailSession');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const uuid = searchParams.get(id);

        if (uuid && isUuid(uuid)) {
            getSession(uuid);
        }
        else {
            navigate(-1);
        }

        return () => {
            clear();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const movieHandleClick = useCallback(async (uuid: string) => {
        const params = new URLSearchParams({ [id]: uuid });

        await navigate(`/movie?${params}`);
    }, [navigate]);

    const hallHandleClick = useCallback(async (uuid: string) => {
        const params = new URLSearchParams({ [id]: uuid });

        await navigate(`/hall?${params}`);
    }, [navigate]);

    const loginNavigate = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const seatHandleClick = useCallback(async (seat: ISeat) => {
        if (isLoggined && session && session.tickets) {
            const ticket = session.tickets.find(ticket => ticket.seatId === seat.id);

            if (ticket && ticket.id) {
                await createPurchase(ticket.id);
            }
        }
        else {
            loginNavigate();
        }
    }, [createPurchase, isLoggined, loginNavigate, session]);

    return (
        <>
            {
                session && session.movie && session.hall && session.status ?
                    <Container fluid className="mt-3">
                        <Row>
                            <div className="col-7">
                                <h1>Movie: {session.movie.name} <br /> <span style={{ cursor: "pointer" }} onClick={() => movieHandleClick(session.movie!.id)}>{session.movie.id}</span></h1>
                                <h4>Hall: {session.hall.name} - {session.hall.capacity} <br /> <span style={{ cursor: "pointer" }} onClick={() => hallHandleClick(session.hall!.id)}>{session.hall.id}</span></h4>
                                <h4>Status: {session.status.name}</h4>
                                <h4>Start: {formatDateWithTime(session.startAt)}</h4>
                                <h4>End: {formatDateWithTime(session.endAt)}</h4>
                            </div>
                            <div className="col-5 ps-3">
                                {
                                    session.tickets && session.tickets.length > 0 &&
                                    session.tickets.map(ticket =>
                                        <div key={ticket.id}>
                                            <h3>Ticket {ticket.price}</h3>
                                            <p>Seat: {ticket.seat?.row}-{ticket.seat?.number}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </Row>
                        <Row>
                            <Container fluid>
                                <h3 className="text-center">Hover and wait to see the price</h3>
                                <SeatsVisualization
                                    seats={session.seats}
                                    screened
                                    disabled={session.status.name !== "Pending"}
                                    onSeatClick={isLoggined ? seatHandleClick : loginNavigate}
                                    title={(seat) => session.histories.some(history => session.tickets.some(ticket => ticket.seatId === seat.id && ticket.id === history.ticketId)) ? "Sold" : session.tickets.find(ticket => ticket.seatId === seat.id)?.price || "Unknown"}
                                    beforeColorChange={{ condition: (seat) => !session.tickets.some(ticket => ticket.seatId === seat.id), true: '#7f7f7f' }}
                                    colorChanger={{ condition: (seat) => session.histories.some(history => session.tickets.some(ticket => ticket.seatId === seat.id && ticket.id === history.ticketId)), false: '#008000', true: '#ff0000' }} />
                            </Container>
                        </Row>
                    </Container >
                    :
                    <div className="position-absolute text-center top-50 start-50 translate-middle">
                        <Loader visible={true} />
                    </div>
            }
        </>
    )
}

export default Session;