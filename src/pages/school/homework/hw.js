import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "../../../config/axios";

import './hw.css';
import moment from "moment";
import { Card, Button, Offcanvas } from "react-bootstrap";

function Homework() {
    const { id, fullname, role, stream_id } = useSelector((state) => state.auth);
    const [ homework, setHomework ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);
    const [ filter, setFilter ] = useState([]);
    console.log(homework)

    useEffect(() => {
        fetchSubjects();
        // if (role === "student") {
        //     fetchHomeworkById();
        // } else if (role === "teacher") {
        //     fetchAllHomework();
        // }
        fetchAllHomework();
    }, [])

    // useEffect(() => {
    //     fetchFilteredHomework();
    // }, [filter])

    const fetchSubjects = async () => {
        try {
            const res = await axios.get(`/subjects/${stream_id}`);
            const { data } = res

            setSubjects(data.subjects)
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const fetchAllHomework = async () => {
        try {
            const res = await axios.get(`/homework/${stream_id}`);
            const { data } = res

            setHomework(data.hw)
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return (
        <>
            <h1>Homework</h1>
                <div className="hw-menu">
                    <div class="d-flex flex-wrap col-9 my-5 justify-content-center">
                        {homework.map((hw) => {
                            return (
                                <Card className="hw-card">
                                    <h4>{hw.homework_name}</h4>
                                    <Button variant="dark" onClick={toggleShow} className="mt-auto">
                                        See Details
                                    </Button>
                                    <Offcanvas show={show} onHide={handleClose} scroll="true" backdrop={true}>
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>{hw.homework_name}</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            {hw.homework_desc}
                                            <br></br>
                                            <br></br>
                                            Submit through email.
                                            <br></br>
                                            <br></br>
                                            Due date : {moment(hw.due_date).utc().format('YYYY-MM-DD')}
                                            <br></br>
                                            <br></br>
                                            <Button href="https://www.gmail.com">Submit</Button>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </Card>
                            )
                        })}
                    </div>
                </div>
        </>
    )
}

export default Homework;