import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "../../../../config/axios";

import './submit.css';
import moment from "moment";
import { Button, Badge } from "react-bootstrap";

function Submit() {
    const { stream_id } = useSelector((state) => state.auth);
    
    const [ count, setCount ] = useState([]);
    const [ students, setStudents ] = useState([]);
    const [ homework, setHomework ] = useState([]);
    const [ studentCount, setStudentCount ] = useState([]);

    const [ results, setResults ] = useState([]);
    const [ filter, setFilter ] = useState({
        user_id: '',
        homework_id: '',
        stream_id: stream_id
    });

    const [ check, setCheck ] = useState(false);

    useEffect(() => {
        fetchStudentList();
        fetchHomeworkList();
        fetchResults();
    }, []);

    const fetchFilterResults = async () => {

        try {
            const res = await axios.get('/submit/', {
                params: {
                    stream_id: stream_id,
                    homework_id: filter.homework_id,
                    user_id: filter.user_id
                }
            })
            const { data } = res
        
            setCount(data.count[0]);
            setResults(data.result);
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const fetchStudentList = async () => {

        try {
            const res = await axios.get(`/users/all/${stream_id}`);
            const { data } = res

            setStudentCount(data.count[0])
            setStudents(data.users)
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const fetchHomeworkList = async () => {

        try {
            const res = await axios.get(`/homework/${stream_id}`);
            const { data } = res

            setHomework(data.hw)
        } catch (error) {
            console.log(alert(error.message));
        }

    };

    const fetchResults = async () => {
        
        try {
            const res = await axios.get(`/submit/${stream_id}`)
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
        setFilter({ homework_id: '', user_id: '', stream_id: stream_id })
        fetchResults();
        setCheck(false);
    };

    const badgeNumber = () => {
        if (filter.homework_id && filter.stream_id && filter.user_id === '') {
            setCheck(true)
        } else {
            setCheck(false)
        };
    };

    const searchHandler = () => {
        badgeNumber();
        fetchFilterResults();
    };

    const allHandler = () => {
        badgeNumber();
        fetchResults();
        setCheck(false);
    };

    return (
        <>
            <h1>Submitted Homeworks</h1>

                <div className="d-flex justify-content-center mt-5 pilihan">

                    <select className="form-control submit" name="user_id" onChange={handleChange}>
                        <optgroup label="Filter by students">
                            <option onClick={allHandler} value=''>
                                All
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

                    <select className="form-control submit" name="homework_id" onChange={handleChange}>
                        <optgroup label="Filter by homework">
                            <option onClick={allHandler} value=''>
                                All
                            </option>

                            {homework.map((hw) => {
                                return (
                                    <option value={hw.homework_id}>
                                        {hw.homework_name}
                                    </option>
                                )
                            })}
                        </optgroup>
                    </select>

                    <Button onClick={searchHandler} className="mx-2">Search</Button>
                    <Button onClick={defaultClick} variant="outline-success" className="mx-2">Back to all</Button>
                    
                </div>

                {check ? (
                    <div className="d-flex justify-content-center mt-3">
                        <h4><Badge bg="primary" className="mx-1 mt-3">{count.count}</Badge> out of <Badge bg="primary" className="mx-1 mt-3">{studentCount.count}</Badge></h4>
                    </div>
                ) : (
                    <div></div>
                )};
                
                <div className="my-5">
                    <table id="exam-table">
                        <tr>
                            <th>
                                Submitted by:
                            </th>
                            <th>
                                Homework:
                            </th>
                            <th>
                                Submitted on:
                            </th>
                            <th>
                                File:
                            </th>
                        </tr>

                        {results.map((result) => {
                            return (
                                <tr>
                                    <td>{result.fullname}</td>
                                    <td>{result.homework_name}</td>
                                    <td>{moment(result.created_at).utc(true).format('LLLL')}</td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
        </>
    )
};

export default Submit;