import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { isUuid } from "../../../utils/uuid/valid";
import { id } from "../../../utils/url/search-keys/id/uuid";
import { useEffect } from "react";
import Loader from "../../../components/loader";
import { Container } from "react-bootstrap";
import SeatsVisualization from "../../../components/seats";

const Hall = () => {
    const navigate = useNavigate();

    const { hall } = useTypedSelector(state => state.detailHall);

    const { getHall, clear } = useActions('detailHall');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const uuid = searchParams.get(id);

        if (uuid && isUuid(uuid)) {
            getHall(uuid);
        }
        else if (uuid) {
            navigate(-1);
        }

        return () => {
            clear();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                hall ?
                    <Container fluid className="mt-3">
                        <h1 className="text-center">{hall.name}</h1>
                        <SeatsVisualization seats={hall.seats} screened />
                    </Container>
                    :
                    <div className="position-absolute text-center top-50 start-50 translate-middle">
                        <Loader visible={true} />
                    </div>

            }
        </>
    );
}

export default Hall;