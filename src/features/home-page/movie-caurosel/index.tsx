import { useState, useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from '../../../hooks/useActions';
import axios from "axios";
import converterUrlToImageLocation from "../../../utils/url/converters";
import Loader from "../../../components/loader";
import { IHomeMovie } from "../store/types";
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { id } from "../../../utils/url/search-keys/id/uuid";

const MovieCarousel = () => {
    const { homeMovies } = useTypedSelector(state => state.home);
    const swiperRef = useRef<SwiperClass | null>(null);
    const navigate = useNavigate();

    const [selectedMovie, setSelectedMovie] = useState<IHomeMovie | null>(null);
    const [perView, setPerView] = useState<number>(7);

    const { getMovies } = useActions("home");

    useEffect(() => {
        if (!selectedMovie && homeMovies.length > 0) {
            setSelectedMovie(homeMovies[0]);
        }
    }, [homeMovies, selectedMovie]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getMovies(source.token);

        return () => {
            source.cancel("Get home movies canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        function updateSize() {
            setPerView((window.innerWidth - 300) / 150);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const handleClick = useCallback(async () => {
        if (selectedMovie) {
            const params = new URLSearchParams({ [id]: selectedMovie.id });

            await navigate(`/movie?${params}`);
        }
    }, [navigate, selectedMovie]);

    return (
        <>
            {selectedMovie ? (
                <div className="container text-center no-select">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        slidesPerView={perView < homeMovies.length ? perView : 1}
                        speed={300}
                        spaceBetween={15}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        onSlideChange={(swiper) => {
                            setSelectedMovie(homeMovies[swiper.realIndex]);
                        }}
                        className="w-100 px-5"
                    >
                        {homeMovies.map((movie, index) => (
                            <SwiperSlide key={index} className="cursor-pointer">
                                <img
                                    src={converterUrlToImageLocation(movie.imageUrl)}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`img-thumbnail rounded transition`}
                                    style={{ width: "150px", height: "100px", objectFit: "cover" }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="rounded p-2 mb-3">
                        <Container fluid>
                            <Row>
                                <Col className="d-flex justify-content-center align-items-center">
                                    <span className="d-flex align-items-center justify-content-center flex-grow-1">
                                        Your ad
                                    </span>
                                </Col>
                                <Col>
                                    <img
                                        src={converterUrlToImageLocation(selectedMovie.imageUrl)}
                                        onClick={handleClick}
                                        alt="Selected"
                                        className="img-fluid"
                                        style={{ maxWidth: "500px", height: "350px", objectFit: "cover", cursor: "pointer" }}
                                    />
                                </Col>
                                <Col className="d-flex justify-content-center align-items-center">
                                    <span className="d-flex align-items-center justify-content-center flex-grow-1">
                                        Your ad
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <h2>{selectedMovie.name}</h2>
                                <p>{selectedMovie.description}</p>
                            </Row>
                        </Container>
                    </div>
                </div>
            ) : (
                <div className="position-absolute text-center top-50 start-50 translate-middle">
                    <Loader visible={true} />
                </div>
            )}
        </>
    );
};

export default MovieCarousel;
