import React from "react";

import { useSelector } from "react-redux";

import "./homeTeacher.css";
import { Card, Button } from 'react-bootstrap';

const menu = [
    { title: 'Check homework', dir: '/homework' },
    { title: 'Check exams', dir: '/exams' },
    { title: 'Check attendances', dir: '/attendance' },
    { title: 'Check emails', dir: '/email' },
    { title: 'Create events', dir: '/events' }
]

function HomeTeacher() {
    const { fullname } = useSelector((state) => state.teacher);

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