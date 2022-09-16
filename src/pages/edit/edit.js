import axios from "../../config/axios";
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";

import { Button } from 'react-bootstrap';
import './edit.css';

function Edit() {
    const user_id = useSelector((state) => state.auth.id);

    const [formState, setFormState] = useState({
        username: '',
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        getProfileData();
    }, [])

    const getProfileData = async () => {
        try {
            const res = await axios.get(`/users/${user_id}`)
            const profile = res.data.users[0];

            setFormState(profile)
        } catch (error) {
            console.log({ error })
        }
    }

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column">
                    <h1 className="mb-4">Edit Profile</h1>

                    <h5 id="head">Username</h5>
                    <input placeholder="Username" type="text" name="username" onChange={handleChange} value={formState.username} className="edit" />

                    <h5 id="head">Fullname</h5>
                    <input placeholder="Fullname" type="text" name="name" onChange={handleChange} value={formState.name} className="edit" />

                    <h5 id="head">Email</h5>
                    <input placeholder="Email" type="text" name="email" onChange={handleChange} value={formState.email} className="edit" />

                    <h5 id="head">Password</h5>
                    <input placeholder="Password" type="password" name="password" onChange={handleChange} value={formState.password} className="edit" />

                    <Button className="mt-4">Save</Button>
                </div>
            </div>
        </>
    )
}

export default Edit;