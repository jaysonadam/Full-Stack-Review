import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Navigation from "./components/navbar/navbar";
import Register from "./pages/register/register";

import { useDispatch } from "react-redux";
import { keepLoginAction } from "./store/action/action";

function App() {
    const [isStorageChecked, setIsStorageChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const usersLocalStorage = localStorage.getItem("userData");

        if (usersLocalStorage) {
        const userData = JSON.parse(usersLocalStorage);
        const { id, username } = userData;
        dispatch(keepLoginAction({ id, username }));
        }

        setIsStorageChecked(true);
    }, []);

    if (isStorageChecked) {
    return (
        <>
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reg" element={<Register />} />
            </Routes>
        </Router>
        </>
    )
    } else {
        <>
            <h1>Loading...</h1>
        </>
    }
};

export default App;