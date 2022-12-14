import React from "react";

import { useSelector } from "react-redux";

import "./homeStudent.css";
import { Card, Button } from 'react-bootstrap';

const menu = [
    { title: 'Homework', dir: '/homework' },
    { title: 'Check your exam results', dir: '/exams' },
    { title: 'Check your attendance', dir: '/attendance' },
    { title: 'Send an email', dir: '/email' },
    { title: 'About School', dir: '/about' },
    { title: 'Check our events', dir: '/events' }
]

function HomeStudent() {
    const { username, fullname } = useSelector((state) => state.auth);

    return (
        <>
            <div className="d-flex justify-content-center hs">
                <div className="d-flex flex-column">
                    <h1>Welcome to the School Portal, {fullname}</h1>
                    <div className="menu-home">
                        <div class="d-flex flex-wrap col-9 my-5 justify-content-center">
                            { menu.map((menus) => {
                                return (
                                    <Card className="menu-cards">
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

export default HomeStudent;