import { Button, Form } from "react-bootstrap"
import { useActions } from "../../../hooks/useActions"
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import rootPath from "../../../routes";

export interface ILoginError {
    [key: string]: string[] | undefined;
    email: string[];
    password: string[];
}

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [loginError, setLoginError] = useState<ILoginError>({ email: [], password: [] });

    const { loginAction } = useActions('sign');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoginError({ email: [], password: [] });

        if (emailRef.current && passwordRef.current) {
            loginAction({ email: emailRef.current.value, password: passwordRef.current.value }, setLoginError);
        }
    }

    return (
        <div className="d-flex flex-grow-1 flex-column">
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div className="d-flex flex-column gap-3 w-50 mb-5">
                    <div className="d-flex justify-content-center align-items-center">
                        <h1 className="fw-bold">Login</h1>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Form className="d-flex flex-column gap-3 w-75" onSubmit={handleSubmit}>
                            <Form.Group className="d-flex flex-column gap-1">
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    ref={emailRef}
                                    id="email"
                                    type="email"
                                    isInvalid={!!loginError.email?.[0]}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {loginError.email?.[0]}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="d-flex flex-column gap-1">
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control
                                    ref={passwordRef}
                                    id="password"
                                    type="password"
                                    isInvalid={!!loginError.password?.[0]}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {loginError.password?.[0]}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex justify-content-center align-items-center">
                                <Button className="px-5" type="submit" variant="primary">Login</Button>
                            </div>
                            <div className="d-flex justify-content-center align-items-center mt-2">
                                <Form.Text>
                                    Don't have an account? <Link to={`${rootPath}/register`}>Register</Link>
                                </Form.Text>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login