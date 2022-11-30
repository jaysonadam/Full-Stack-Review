import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "../../../config/axios";

import './hw.css';
import moment from "moment";
import { Card, Button, Offcanvas, Dropdown } from "react-bootstrap";

function OffCanvas({info}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return (
        <>
            <Button variant="dark" onClick={toggleShow} className="mt-auto">
                See Details
            </Button>
            <Offcanvas show={show} onHide={handleClose} scroll="true" backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{info.homework_name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                        {info.homework_desc}
                    <br></br>
                    <br></br>
                        Submit through email.
                    <br></br>
                    <br></br>
                        Due date : {moment(info.due_date).utc(true).format('YYYY-MM-DD')}
                    <br></br>
                    <br></br>
                        <Button href="https://www.gmail.com">Submit</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

function Homework() {
    const { stream_id } = useSelector((state) => state.auth);

    const [ filter, setFilter ] = useState([]);
    const [ homework, setHomework ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);

    useEffect(() => {
        fetchSubjects();
        fetchAllHomework();
    }, [])

    useEffect(() => {
        fetchFilteredHomework();
    }, [filter])

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

    const fetchFilteredHomework = async () => {
        try {
            const res = await axios.get(`/homework/${stream_id}/${filter}`);
            const { data } = res

            setHomework(data.hw)
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    return (
        <>
            <h1>Homework</h1>
                <div className="hw-menu">
                    <div class="d-flex flex-wrap col-9 my-5 justify-content-center">
                        <Dropdown className="choose">
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark">
                                Filter by subject
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item onClick={() => fetchAllHomework()}>All</Dropdown.Item>
                                {subjects.map((subject) => {
                                    return (
                                        <Dropdown.Item value={subject.subject_id} onClick={() => setFilter(subject.subject_id)} name={subject.subject_id}>
                                            {subject.subject_name}
                                        </Dropdown.Item>
                                    )
                                })}                      
                            </Dropdown.Menu>
                        </Dropdown>

                        {homework.map((hw, index) => {
                            return (
                                <Card key={index} className="hw-card">
                                    <h4>{hw.homework_name}</h4>
                                    <br></br>
                                    <h6>Due date : {moment(hw.due_date).utc(true).format('YYYY-MM-DD')}</h6>
                                    <OffCanvas 
                                        key={index}
                                        info={hw}
                                    />
                                </Card>
                            )
                        })}
                    </div>
                </div>
        </>
    )
}

export default Homework;