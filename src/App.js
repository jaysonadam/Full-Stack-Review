import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Edit from "./pages/editProfile/edit";
import AddProducts from "./pages/add/add";
import Register from "./pages/register/register";
import Products from "./pages/products/products";
import Navigation from "./components/navbar/navbar";
import Attendance from "./pages/attendance/attendance";
import LoginTeacher from "./pages/loginTeacher/loginTeacher";
import LoginStudent from "./pages/loginStudent/loginStudent";
import EditProducts from "./pages/editProducts/editProducts";

import { useDispatch } from "react-redux";
import { keepLoginAction } from "./store/action/action";

function App() {
    const [isStorageChecked, setIsStorageChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const usersLocalStorage = localStorage.getItem("userData");

        if (usersLocalStorage) {
        const userData = JSON.parse(usersLocalStorage);
        const { id, username, role, fullname } = userData;
        dispatch(keepLoginAction({ id, username, role, fullname }));
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
                <Route path="/edit" element={<Edit />} />
                <Route path="/reg" element={<Register />} />
                <Route path="/add" element={<AddProducts />} />
                <Route path="/products" element={<Products />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/loginTeacher" element={<LoginTeacher />} />
                <Route path="/loginStudent" element={<LoginStudent />} />
                <Route path="/edit-products" element={<EditProducts />} />
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