import React, { useState } from 'react'
import './login.css';

import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = JSON.stringify({
            email,
            password
        })

        fetch("https://assignment-mern-wu1u.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res.message === 'Login failed') {
                    alert("Please fill correct credentials")
                } else {
                    localStorage.setItem("token", res.token)
                    window.location.href = "/tasks";
                }
            })
        // .catch((err) => { });
    }
    return (
        <div>
            <div className='login-outer-div'>
                <Container className="login-container">
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6}>
                            <div className="login-form">
                                <h2>Login</h2>
                                <Form onSubmit={handleSubmit}>

                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            onChange={(e) => { setPassword(e.target.value) }}
                                            required
                                        />
                                    </Form.Group>
                                    <div style={{ "textAlign": "center", "marginTop": "10px" }}> <p>Don't have an account ? </p>
                                        <Link to={"/signup"}>Sign up</Link></div>
                                    <br />
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Login
