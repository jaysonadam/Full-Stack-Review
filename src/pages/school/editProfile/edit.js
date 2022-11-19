import React, { useState, useEffect } from "react";
import axios from "../../../config/axios";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { editAction } from "../../../store/action/action";

import { Button } from 'react-bootstrap';
import './edit.css';

function Edit() {
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.auth.id);

    const [updated, setUpdated] = useState(false);
    const [formState, setFormState] = useState({
        username: '',
        name: '',
        email: '',
        role: '',
        password: ''
    });

    useEffect(() => {
        getProfileData();
    }, [])

    const getProfileData = async () => {
        try {
            const res = await axios.get(`/users/${user_id}`)
            const profile = res.data.users[0];

            setFormState(profile);

        } catch (error) {
            console.log({ error })
        }
    };

    const putUserProfile = async () => {
        try {
            const res = await axios.put(`/users/edit/${user_id}`, {
                username: formState.username,
                name: formState.name,
                email: formState.email,
                password: formState.password
            })

            alert("Update was successful");

                const edit = { id: user_id, username: formState.username, role: formState.role };
                const action = editAction(edit);
                dispatch(action);

            setUpdated(true);

        } catch (error) {
            console.log({ error })
        }
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    };

    if (updated === true) {
        return <Navigate to="/" replace />
    };

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

                    <Button className="mt-4" onClick={putUserProfile}>Save</Button>
                </div>
            </div>
        </>
    )
};

export default Edit;