import { useRef, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseViteUrl } from "../../../utils/enviroment/settings";

export interface ICreateUserError {
    [key: string]: string[] | undefined;
    email: string[],
    password: string[],
    confirmPassword: string[]
}

const Register = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [createUserError, setCreateUserError] = useState<ICreateUserError>({ email: [], password: [], confirmPassword: [] });

    const { createUserAction } = useActions('sign');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCreateUserError({ email: [], password: [], confirmPassword: [] });

        if (emailRef.current && passwordRef.current && confirmPasswordRef.current) {
            createUserAction({ email: emailRef.current.value, password: passwordRef.current.value, confirmPassword: confirmPasswordRef.current.value }, setCreateUserError);
        }
    }

    return (
        <div className="d-flex flex-grow-1 flex-column">
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div className="d-flex flex-column gap-3 w-50 mb-5">
                    <div className="d-flex justify-content-center align-items-center">
                        <h1 className="fw-bold">Register</h1>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Form className="d-flex flex-column gap-3 w-75" onSubmit={handleSubmit}>
                            <Form.Group className="d-flex flex-column gap-1">
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    ref={emailRef}
                                    id="email"
                                    type="email"
                                    isInvalid={!!createUserError.email?.[0]}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {createUserError.email?.[0]}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="d-flex flex-column gap-1">
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control
                                    ref={passwordRef}
                                    id="password"
                                    type="password"
                                    isInvalid={!!createUserError.password?.[0]}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {createUserError.password?.[0]}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="d-flex flex-column gap-1">
                                <Form.Label htmlFor="confirm-password">Confirm password</Form.Label>
                                <Form.Control
                                    ref={confirmPasswordRef}
                                    id="confirm-password"
                                    type="password"
                                    isInvalid={!!createUserError.confirmPassword?.[0]}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {createUserError.confirmPassword?.[0]}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex justify-content-center align-items-center">
                                <Button className="px-5" type="submit" variant="primary">Register</Button>
                            </div>
                            <div className="d-flex justify-content-center align-items-center mt-2">
                                <Form.Text>
                                    Already have an account? <Link to={`${baseViteUrl}/login`}>Login</Link>
                                </Form.Text>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
