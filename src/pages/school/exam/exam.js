import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "../../../config/axios";

import './exam.css';
import moment from "moment";
import { Card, Dropdown } from "react-bootstrap";

function Exams() {
    const { id, fullname, role, stream_id } = useSelector((state) => state.auth);

    const [ results, setResults ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);
    const [ filter, setFilter ] = useState([]);
    console.log(results)
    console.log(subjects)
    console.log(stream_id)
    console.log(role)

    useEffect(() => {
        fetchSubjects();
        if (role === "student") {
            fetchResultsByStudentId();
        } else if (role === "teacher") {
            fetchAllResults();
        }
    }, [])

    useEffect(() => {
        fetchFilteredResults();
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

    const fetchResultsByStudentId = async () => {
        try {
            const res = await axios.get(`/grades/${id}`);
            const { data } = res
    
            setResults(data.grades);
          } catch (error) {
                console.log(alert(error.message));
          }
    };

    const fetchAllResults = async () => {
        try {
            const res = await axios.get(`/grades/${stream_id}`);
            const { data } = res
    
            setResults(data.grades);
          } catch (error) {
            console.log(alert(error.message));
          }
    };

    const fetchFilteredResults = async () => {
        try {
            const res = await axios.get(`/grades/${stream_id}/${filter}`);
            const { data } = res
    
            setResults(data.grades);
          } catch (error) {
            console.log(alert(error.message));
          }
    };

    if (role === "student") {
        return (
            <>
                <h1>Exam Results</h1>
                <h2 className="d-flex justify-content-center mt-5">{fullname}</h2>
                <h4 className="d-flex justify-content-center my-3">Student ID : {id}</h4>

                <Dropdown className="choose">
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="success">
                        Filter by subject
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item onClick={() => fetchResultsByStudentId()}>All</Dropdown.Item>
                        {subjects.map((subject) => {
                            return (
                                <Dropdown.Item value={subject.subject_id} onClick={() => setFilter(subject.subject_id)} name={subject.subject_id}>
                                    {subject.subject_name}
                                </Dropdown.Item>
                            )
                        })}                      
                    </Dropdown.Menu>
                </Dropdown>

                <div className="menu-exam">
                    <div class="d-flex flex-wrap col-9 my-5 justify-content-center">
                    {results.map((result) => {
                        return (
                            <Card className="exam-cards">
                                <h3>{result.exam_name}</h3>
                                <h5>Date: {moment(result.exam_date).utc().format('YYYY-MM-DD')}</h5>
                                <h3 className="mt-auto">Grade: {result.grades}</h3>
                            </Card>
                        )
                    })}
                    </div>
                </div>
            </>
        )
    } else if (role === "teacher") {
        return (
            <>
                <h1>Exam Results</h1>

                <div className="menu-exam">
                    <div class="d-flex flex-wrap col-9 my-5 justify-content-center">
                    {results.map((result) => {
                        return (
                            <Card className="exam-cards">
                                <h3>{result.fullname}</h3>
                                <h3>Grade: {result.grades}</h3>
                                <h5 className="mt-auto">{result.exam_name}</h5>
                                <h5>Date: {moment(result.exam_date).utc().format('YYYY-MM-DD')}</h5>
                            </Card>
                        )
                    })}
                    </div>
                </div>
            </>
        )
    }
}

export default Exams;