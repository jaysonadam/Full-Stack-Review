import React from "react";

import { useSelector } from "react-redux";

import "./homeTeacher.css";
import { Card, Button } from 'react-bootstrap';

const menu = [
    { title: 'Submitted Homework', dir: '/submit-hw' },
    { title: 'Homework List', dir: '/homework' },
    { title: 'Attendances', dir: '/attendance' },
    { title: 'Exams', dir: '/exam-teacher' },
    { title: 'Emails', dir: 'https://www.gmail.com' },
    { title: 'Events', dir: '/events' },
    { title: 'Subjects', dir: '/subjects' }
]

function HomeTeacher() {
    const { fullname } = useSelector((state) => state.auth);

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column">
                    <h1>Welcome to the Teacher's Portal, {fullname}</h1>
                    <div className="menu-home-t">
                        <div class="d-flex flex-wrap col-9 my-5 justify-content-center">
                            { menu.map((menus) => {
                                return (
                                    <Card className="menu-cards-t">
                                        <h4 style={{ margin: '14px' }}>{menus.title}</h4>
                                        <Button href={menus.dir} variant="dark" style={{ margin: '14px', marginTop: 'auto' }}>Click Here</Button>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default HomeTeacher;