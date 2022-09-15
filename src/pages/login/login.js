import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "../../config/axios";
import { loginAction } from "../../store/action/action";

import './login.css';
import { Button } from 'react-bootstrap';

function Login() {
    const username = useSelector((state) => state.auth.username);
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const onLogin = async () => {
        try {
            const res = await axios.post("/users/login", {
                username: formState.username,
                password: formState.password
            });

            const user = res.data.user[0]
            
            console.log(user)
            const action = loginAction(user)

            dispatch(action)
            
        } catch (error) {
            console.log({error})
        }
    };

    const onLoginClick = () => {
        onLogin();
    };

    const onInputPress = (e) => {
        if (e.code === "Enter") onLogin();
    };

    if (username) {
        return <Navigate to="/" replace />
    }

    return (
        <>
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <h1>Login</h1>
                <input placeholder="Username" type="text" name="username" onChange={handleChange} />
                <input placeholder="Password" type="password" name="password" onChange={handleChange} />
                <Button onClick={onLoginClick} onKeyPress={onInputPress}>Login</Button>
            </div>
        </div>
        </>
    )
}

export default Login;