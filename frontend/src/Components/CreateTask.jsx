import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    const token = localStorage.getItem("token") || "";

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = JSON.stringify({
            title, description, status
        })
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`http://localhost:8080/tasks/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: payload
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    setTitle(res.Task.title || '');
                    setDescription(res.Task.description || '');
                    setStatus(res.Task.status || '');

                })
            window.location.href = "/tasks";

        } else {
            alert("Login First !!");
            window.location.href = "/";
        }
    }
    return (
        <div>
            <Container className="login-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className="login-form">
                            <h2>Create task</h2>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value) }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        placeholder="Enter status"
                                        onChange={(e) => { setStatus(e.target.value) }}
                                        required
                                    />
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    {/* <Link to={"/tasks"} style={{ "textDecoration": "none", "color": "white" }}> */}
                                    Submit
                                    {/* </Link> */}
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateTask
