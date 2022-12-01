import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "../../../config/axios";

import './examT.css';
import moment from "moment";
import { Card, Badge, Button } from "react-bootstrap";

function ExamsT() {
    const { stream_id } = useSelector((state) => state.auth);

    const [ count, setCount ] = useState([]);
    const [ exams, setExams ] = useState([]);
    const [ results, setResults ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);
    const [ students, setStudents ] = useState([]);

    const [ filter, setFilter ] = useState({
        exam_id: '',
        user_id: '',
        subject_id: ''
    });

    useEffect(() => {
        fetchExamId();
        fetchSubjects();
        fetchStudentList();
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
    
    const fetchStudentList = async () => {

        try {
            const res = await axios.get(`/users/all/${stream_id}`);
            const { data } = res

            setStudents(data.users)
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const fetchGrades = async () => {

        try {
            const res = await axios.get(`/grades/${stream_id}`)
            const { data } = res
        
            setCount(data.count[0]);
            setResults(data.result);
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const fetchSearchGrades = async () => {

        try {
            const res = await axios.get('/grades/', {
                params: {
                    exam_id: filter.exam_id,
                    user_id: filter.user_id,
                    subject_id: filter.subject_id
                }
            })
            const { data } = res
        
            setCount(data.count[0]);
            setResults(data.result);
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    };

    const defaultClick = () => {
        setFilter({ exam_id: '', user_id: '', subject_id: '' })
        fetchGrades();
    };
    
        return (
            <>
                <h1>Exam Results</h1>

                <div className="d-flex justify-content-center mt-4">
                    <Button variant="outline-dark">
                        Found <Badge bg="dark">{count.count}</Badge>
                    </Button>
                </div>

                <div className="menu-exam-t">
                    <div className="d-flex flex-wrap col-12 my-5 justify-content-center">
                    
                    <div className="w-100 d-flex justify-content-around px-3 dd">
                        
                        {/* Subject */}
                        <select className="form-control d-flex justify-content-center pilih-t" name="subject_id" onChange={handleChange}>
                            <optgroup label="Filter by subjects">
                                <option onClick={() => fetchGrades()}>
                                    All subjects
                                </option>
                                {subjects.map((subject) => {
                                    return (
                                        <option key={subject.subject_id} value={subject.subject_id}>
                                            {subject.subject_name}
                                        </option>
                                    )
                                })}
                            </optgroup>                     
                        </select>

                        {/* Exams */}
                        <select className="form-control d-flex justify-content-center pilih-t" name="exam_id" onChange={handleChange}>
                            <optgroup label="Filter by exams">
                                <option onClick={() => fetchGrades()}>
                                    All exams
                                </option>

                                {exams.map((exam) => {
                                    return (
                                        <option value={exam.exam_id}>
                                            {exam.exam_name}
                                        </option>
                                    )
                                })}
                            </optgroup>
                        </select>

                        {/* Students */}
                        <select className="form-control d-flex justify-content-center pilih-t" name="user_id" onChange={handleChange}>
                            <optgroup label="Filter by students">
                                <option onClick={() => fetchGrades()}>
                                    All students
                                </option>

                                {students.map((student) => {
                                    return (
                                        <option value={student.user_id}>
                                            {student.fullname}
                                        </option>
                                    )
                                })}
                            </optgroup>
                        </select>

                        <button className="tombol" onClick={() => fetchSearchGrades()}>Search</button>
                        <button className="tombol" onClick={defaultClick}>Reset</button>
                        <button className="tombol"> + Add exam results</button>
                    </div>

                    {results.map((result) => {
                        return (
                            <Card className="exam-cards-t">
                                <Card.Body className="d-flex justify-content-around align-items-center">
                                    <h6>{result.fullname}</h6>
                                    <h6>Grade: {result.grades}</h6>
                                    <h6>{result.exam_name}</h6>
                                    <h6>Date: {moment(result.exam_date).utc(true).format('YYYY-MM-DD')}</h6>
                                </Card.Body>
                            </Card>
                        )
                    })}
                    </div>
                </div>
            </>
        );
};

export default ExamsT;