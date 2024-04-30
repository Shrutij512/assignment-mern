import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const EditTask = () => {
    const { id } = useParams()
    // console.log(id)
    const [taskData, setTaskData] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        getInputData();
    }, [])

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/tasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // console.log(data);
            if (data.message === "Invalid token") {
                setTaskData([]);
            } else {
                setTaskData(data.Tasks);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    const getInputData = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`https://assignment-mern-wu1u.vercel.app/tasks/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            const data = await res.json()

            // setTaskData(res.Task);
            setTitle(data.Task.title || '');
            setDescription(data.Task.description || '');
            setStatus(data.Task.status || '');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = JSON.stringify({
            title, description, status
        })
        const token = localStorage.getItem("token");

        fetch(`https://assignment-mern-wu1u.vercel.app/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: payload
        })
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((res) => {
                console.log(res)
                setTitle(res.Task.title || '');
                setDescription(res.Task.description || '');
                setStatus(res.Task.status || '');
                fetchData()

            })
        window.location.href = "/tasks";
    }


    return (
        <div>
            <Container className="login-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className="login-form">
                            <h2>Edit task</h2>
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
                                    Save
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

export default EditTask
