import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "../../../config/axios";

import './examT.css';
import moment from "moment";
import { Card, Badge, Button } from "react-bootstrap";
import ParticlesBackground from "../../../components/particles/particles";

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

    const fetchAllGrades = async () => {

        try {
            const res = await axios.get(`/grades/${stream_id}`)
            const { data } = res
        
            setCount(data.count[0]);
            setResults(data.result);
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const fetchGrades = async () => {

        try {
            const res = await axios.get('/grades/', {
                params: {
                    stream_id: stream_id,
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
        fetchAllGrades();
    };
    
        return (
            <>
                <ParticlesBackground />
                <h1>Exam Results <Badge bg="primary" className="mx-3">{count.count}</Badge></h1>

                <div className="menu-exam-t">
                    <div className="d-flex flex-wrap col-12 my-5 justify-content-center">
                    
                    <div className="w-100 d-flex justify-content-around px-3 dd">
                        
                        {/* Subject */}
                        <select className="form-control d-flex justify-content-center pilih-t" name="subject_id" onChange={handleChange}>
                            <optgroup label="Filter by subjects">
                                <option onClick={() => fetchGrades()} value=''>
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
                                <option onClick={() => fetchGrades()} value=''>
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
                                <option onClick={() => fetchGrades()} value=''>
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

                        <button className="tombol" onClick={() => fetchGrades()}>Search</button>
                        <button className="tombol" onClick={defaultClick}>Reset</button>
                        <button className="tombol"> + Add exam results</button>
                    </div>

                    <table id="exam-table">
                        <tr>
                            <th>
                                Student Name
                            </th>
                            <th>
                                Grade
                            </th>
                            <th>
                                Exam
                            </th>
                            <th>
                                Exam Date
                            </th>
                        </tr>

                        {results.map((result) => {
                            return (
                                <tr>
                                    <td>{result.fullname}</td>
                                    <td>{result.grades}</td>
                                    <td>{result.exam_name}</td>
                                    <td>{moment(result.exam_date).utc(true).format('DD-MM-YYYY')}</td>
                                </tr>
                            )
                        })}

                    </table>

                    </div>
                </div>
            </>
        );
};

export default ExamsT;