import React from "react";

import './register.css';
import { Button } from 'react-bootstrap';

function Register() {
    return (
        <>
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <h1>Regsiter</h1>
                <input placeholder="Create a Username" type="text" name="username" className="input"/>
                <input placeholder="Full Name" type="text" name="name" className="input"/>
                <input placeholder="Enter your email" type="text" name="email" className="input"/>
                <input placeholder="Create a Password" type="password" name="password" className="input"/>
                <Button>Create Account</Button>
            </div>
        </div>
        </>
    )
}

export default Register;