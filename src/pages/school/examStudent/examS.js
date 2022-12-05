import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "../../../config/axios";

import './examS.css';
import moment from "moment";
import { Card, Dropdown, Badge, Button } from "react-bootstrap";
import ParticlesBackground from "../../../components/particles/particles";

function Exams() {
    const { id, fullname, stream_id } = useSelector((state) => state.auth);

    const [ count, setCount ] = useState(0);
    const [ exams, setExams ] = useState([]);
    const [ results, setResults ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);

    const [ examId, setExamId ] = useState('');
    const [ subjectId, setSubjectId ] = useState('');

    useEffect(() => {
        fetchExamId();
        fetchSubjects();
        fetchGrades();
    }, []);

    const fetchSubjects = async () => {

        try {
            const res = await axios.get(`/subjects/${stream_id}`);
            const { data } = res

            setSubjects(data.subjects)
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const fetchExamId = async () => {

        try {
            const res = await axios.get(`/exam/${stream_id}`);
            const { data } = res

            setExams(data.exams)
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const fetchGrades = async () => {

        try {
            const res = await axios.get('/grades/', {
                params: {
                    stream_id: stream_id,
                    exam_id: examId,
                    user_id: id,
                    subject_id: subjectId
                }
            })
            const { data } = res
        
            setCount(data.count[0]);
            setResults(data.result);
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const fetchAllGrades = async () => {

        try {
            const res = await axios.get(`/grades/${stream_id}/${id}`)
            const { data } = res
        
            setCount(data.count[0]);
            setResults(data.result);
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const subjectChange = (e) => {
        setExamId('')
        setSubjectId(e)
    };

    const examChange = (e) => {
        setExamId(e)
    };

    const defaultClick = () => {
        setExamId('');
        setSubjectId('');
        fetchAllGrades();
    };

        return (
            <>
                <ParticlesBackground />
                <h1>Exam Results <Badge bg="dark" className="mx-2">{count.count}</Badge></h1>
                <h2 className="d-flex justify-content-center mt-5">{fullname}</h2>
                <h4 className="d-flex justify-content-center my-4">Student ID : {id}</h4>

                <div className="d-flex justify-content-center mt-5">
                    <Dropdown onSelect={subjectChange} className="mx-2">
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="success">
                            Filter by subject
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item onClick={defaultClick}>All</Dropdown.Item>
                            {subjects.map((subject) => {
                                return (
                                    <Dropdown.Item eventKey={subject.subject_id}>
                                        {subject.subject_name}
                                    </Dropdown.Item>
                                )
                            })}                      
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown onSelect={examChange} className="mx-2">
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="success">
                            Filter by exam
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item onClick={defaultClick}>All</Dropdown.Item>
                            {exams.map((exam) => {
                                return (
                                    <Dropdown.Item eventKey={exam.exam_id}>
                                        {exam.exam_name}
                                    </Dropdown.Item>
                                )
                            })}                      
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <Button variant="danger" onClick={() => fetchGrades()} className="mx-2">Search</Button>
                    <Button variant="outline-danger" onClick={defaultClick} className="mx-2">Back to all</Button>
                </div>

                <div className="menu-exam">
                    <div class="d-flex flex-wrap col-9 my-4 justify-content-center">
                    {results.map((result) => {
                        return (
                            <Card className="exam-cards">
                                <Card.Body className="d-flex justify-content-around align-items-center">
                                    <h5 className="m-0">{result.exam_name}</h5>
                                    <h5 className="m-0">Grade : {result.grades}</h5>
                                    <h5 className="m-0">Date : {moment(result.exam_date).utc(true).format('DD-MM-YYYY')}</h5>
                                </Card.Body>
                            </Card>
                        )
                    })}
                    </div>
                </div>
            </>
        );
};

export default Exams;