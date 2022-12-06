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
                        Due date : {moment(info.due_date).utc(true).format('DD-MM-YYYY')}
                    <br></br>
                    <br></br>
                        <Button href="https://www.gmail.com">Submit</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
};

function OffCanvasAdd() {
    const { stream_id } = useSelector((state) => state.auth);

    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    const [ subjectList, setSubjectList ] = useState([]);
    const [ checkHomework, setCheckHomework ] = useState([]);

    const [ addHomework, setAddHomework ] = useState({
        homework_name: '',
        homework_desc: '',
        due_date: '',
        subject_id: '',
        stream_id: stream_id
    });

    const [ button, setButton ] = useState(true);

    const setTrue = () => {
        if (addHomework.homework_name && addHomework.homework_desc && addHomework.due_date && addHomework.subject_id) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const postHomework = async () => {

        try {
            const resCheck = await axios.get('/homework/', {
                params: {
                    homework_name: addHomework.homework_name
                }
            })

            const { data } = resCheck

            setCheckHomework(data.hasil)

            if (checkHomework) {

                if (checkHomework.homework_name === addHomework.homework_name) {

                    alert('Homework name already exist')

                } else {

                    try {
                        const res = await axios.post('/homework/', {
                            stream_id: addHomework.stream_id,
                            subject_id: addHomework.subject_id,
                            homework_name: addHomework.homework_name,
                            homework_desc: addHomework.homework_desc,
                            due_date: addHomework.due_date
                        });
            
                        alert('Successfully added')
                    } catch (error) {
                        console.log(alert(error.message));
                    }

                }

            } else {

                try {
                    const res = await axios.post('/homework/', {
                        stream_id: addHomework.stream_id,
                        subject_id: addHomework.subject_id,
                        homework_name: addHomework.homework_name,
                        homework_desc: addHomework.homework_desc,
                        due_date: addHomework.due_date
                    });
        
                    alert('Successfully added')
                } catch (error) {
                    console.log(alert(error.message));
                }

            }

        } catch (error) {
            console.log(alert(error.message));
        }

    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    useEffect(() => {
        setTrue();
    }, [addHomework]);

    const fetchSubjects = async () => {

        try {
            const res = await axios.get(`/subjects/${stream_id}`);
            const { data } = res

            setSubjectList(data.subjects)
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const handleChange = (e) => {
        setAddHomework({ ...addHomework, [e.target.name]: e.target.value })
    };

    return (
        <>
            <Button onClick={toggleShow} className="add-hw">
                Add new homework
            </Button>
            <Offcanvas show={show} onHide={handleClose} scroll="true" backdrop={true} placement='top' style={{ height: 'auto' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add new homework</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <h6>Subject:</h6>
                    <select className="form-control d-flex justify-content-center" name="subject_id" onChange={handleChange}>
                        <option value=''>Choose</option>
                        {subjectList.map((subjects) => {
                            return (
                                <option key={subjects.subject_id} value={subjects.subject_id}>
                                    {subjects.subject_name}
                                </option>
                            )
                        })}
                    </select>
                        <br></br>
                    <h6>Homework Name:</h6>
                    <input name="homework_name" onChange={handleChange} className="form-control"></input>
                        <br></br>
                    <h6>Homework Description:</h6>
                    <textarea name="homework_desc" onChange={handleChange} className="form-control desc"></textarea>
                        <br></br>
                    <h6>Set due date:</h6>
                    <input name="due_date" onChange={handleChange} className="form-control" type="date"></input>
                        <br></br>
                    <Button disabled={button} style={{ width: '100%' }} onClick={() => postHomework()}>Submit</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
};

function Homework() {
    const { stream_id, role } = useSelector((state) => state.auth);

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

    if (role === "teacher") {

    return (
        <>
            <h1>Homework</h1>
                <div className="hw-menu">
                    <div class="d-flex flex-wrap col-9 my-4 justify-content-center">
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

                        <OffCanvasAdd>Add homework</OffCanvasAdd>

                        {homework.map((hw, index) => {
                            return (
                                <Card key={index} className="hw-card">
                                    <h4>{hw.homework_name}</h4>
                                    <br></br>
                                    <h6>Due date : {moment(hw.due_date).utc(true).format('DD-MM-YYYY')}</h6>
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

    } else {

        return (
            <>
                <h1>Homework</h1>
                    <div className="hw-menu">
                        <div class="d-flex flex-wrap col-9 my-4 justify-content-center">
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
                                        <h6>Due date : {moment(hw.due_date).utc(true).format('DD-MM-YYYY')}</h6>
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
};

export default Homework;