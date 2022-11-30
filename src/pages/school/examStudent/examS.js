import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "../../../config/axios";

import './examS.css';
import moment from "moment";
import { Card, Dropdown } from "react-bootstrap";

function Exams() {
    const { id, fullname, stream_id } = useSelector((state) => state.auth);

    const [ filter, setFilter ] = useState([]);
    const [ results, setResults ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);

    useEffect(() => {
        fetchSubjects();
        fetchAllResults();
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

    const fetchAllResults = async () => {

        try {
            const res = await axios.get(`/grades/${id}`);
            const { data } = res
        
            setResults(data.grades);
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const fetchFilteredResults = async () => {
        
        try {
            const res = await axios.get(`/grades/${filter}/${id}`)
            const { data } = res
        
            setResults(data.grades);
            console.log('c')
        } catch (error) {
            console.log(alert(error.message));
        }

    };

        return (
            <>
                <h1>Exam Results</h1>
                <h2 className="d-flex justify-content-center mt-5">{fullname}</h2>
                <h4 className="d-flex justify-content-center my-3">Student ID : {id}</h4>

                <Dropdown className="d-flex justify-content-center mt-5">
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="success">
                        Filter by subject
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item onClick={() => fetchAllResults()}>All</Dropdown.Item>
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
                                <Card.Body className="d-flex justify-content-around align-items-center">
                                    <h5>{result.exam_name}</h5>
                                    <h5>Grade : {result.grades}</h5>
                                    <h5>Date : {moment(result.exam_date).utc(true).format('YYYY-MM-DD')}</h5>
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