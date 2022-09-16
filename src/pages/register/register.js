import React, { useState } from "react";

import './register.css';
import { Button } from 'react-bootstrap';
import axios from "../../config/axios";

function Register() {
    const [register, setRegister] = useState({
        username: '',
        name: '',
        email: '',
        password: ''
    });

    const onRegister = async () => {
        try {
            const res = await axios.post("/users/reg", {
                username: register.username,
                name: register.name,
                email: register.email,
                password: register.password
            })
        } catch (error) {
            console.log({ error })
        }
    };

    const handleChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value })
    }

    const onRegisterClick = () => {
        onRegister();
    };

    return (
        <>
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <h1>Regsiter</h1>
                <input placeholder="Create a Username" type="text" name="username" className="input" onChange={handleChange}/>
                <input placeholder="Full Name" type="text" name="name" className="input" onChange={handleChange}/>
                <input placeholder="Enter your email" type="text" name="email" className="input" onChange={handleChange}/>
                <input placeholder="Create a Password" type="password" name="password" className="input" onChange={handleChange}/>
                <Button className="create" onClick={onRegisterClick}>Create Account</Button>
            </div>
        </div>
        </>
    )
}

export default Register;