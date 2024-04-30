import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import TaskCard from './TaskCard';


const Tasks = () => {

    const [taskData, setTaskData] = useState([]);
    // console.log(taskData)

    useEffect(() => {
        fetchData();
    }, [])

    const token = localStorage.getItem("token");

    // const fetchData = async () => {

    //     await fetch("`http://localhost:8080/tasks", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             if (res.message == "Invalid token") {
    //                 setTaskData([]);
    //             } else {
    //                 console.log(res);
    //                 setTaskData(res.Tasks);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('Error fetching tasks:', error);
    //         });
    // }

    const fetchData = async () => {
        try {
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

    const handleDelete = async (id) => {
        try {

            const token = localStorage.getItem("token");

            const res = await fetch(`https://assignment-mern-wu1u.vercel.app/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            const data = await res.json()
            console.log(data)
            if (data.message === "Task not found") {
                alert("You cannot delete this task")
            }
            // console.log(data.Task);
            fetchData();

        } catch (error) {
            console.log('Error deleting task: ', error)
            alert("You cannot delete this task");
        }
    }

    return (
        <div>
            <h2 id='taskH2'>Tasks</h2>

            {!token ? (
                <div>
                    <h1 style={{ "textAlign": "center", "color": "burlywood" }}>Login First !!!!</h1>

                </div>
            ) :
                (<Container className="mt-5">
                    <Row xs={1} md={2} className="g-4">
                        {taskData?.map((task) => (
                            <Col key={task.id}>
                                <TaskCard task={task}
                                    handleDelete={handleDelete} />
                            </Col>
                        ))}
                    </Row>
                </Container>)}
        </div>
    )
}

export default Tasks
