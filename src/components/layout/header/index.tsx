import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import routes from "../../../routes";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from '../../../hooks/useActions';
import { baseViteUrl } from "../../../utils/enviroment/settings";

const symbolsLimit = 25;

const Limiter = (x: string)
    : string => x.length > symbolsLimit ? `${x.slice(0, symbolsLimit)}...` : x;

const Header = () => {
    const { isLoggined, role } = useTypedSelector(state => state.sign);

    const { logoutAction } = useActions('sign');

    return (
        <header>
            <Navbar className="bg-dark-gray">
                <Container>
                    <Navbar.Brand as={Link} to={routes[0].path}>
                        {routes[0].name}
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            routes.slice(1).map(x =>
                                role?.includes(x.accessLevel) &&
                                (
                                    x.nested ?
                                        <NavDropdown key={x.path} title={Limiter(x.name)}>
                                            {
                                                x.nested.map(x2 =>
                                                    role.includes(x2.accessLevel) &&
                                                    (
                                                        <NavDropdown.Item as={Link} key={`${x2.path}${x2.name}`} to={`${x.path}${x2.path}`}>
                                                            {Limiter(x2.name)}
                                                        </NavDropdown.Item>
                                                    )
                                                )
                                            }
                                        </NavDropdown>
                                        :
                                        x.component &&
                                        <Nav.Item key={`${x.path}${x.name}`}>
                                            <Link className="nav-link" to={x.path}>{Limiter(x.name)}</Link>
                                        </Nav.Item>
                                )
                            )
                        }
                    </Nav>
                    <Nav className="ms-auto">
                        {

                            isLoggined ?
                                <>
                                    <Nav.Item>
                                        <Button variant="link" onClick={() => {
                                            logoutAction();
                                        }}>
                                            Logout
                                        </Button>
                                    </Nav.Item>
                                </> :
                                <>
                                    <Nav.Item>
                                        <Link className="nav-link" to={`${baseViteUrl}/register`}>Register</Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Link className="nav-link" to={`${baseViteUrl}/login`}>Login</Link>
                                    </Nav.Item>
                                </>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;