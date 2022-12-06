import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/emmerce/homeProducts/home";
import Email from "./pages/school/email/email";
import About from "./pages/school/about/about";
// import AddProducts from "./pages/emmerce/add/add";
import Login from "./pages/school/login/login";
import Events from "./pages/school/event/event";
import Homework from "./pages/school/homework/hw";
import Edit from "./pages/school/editProfile/edit";
import Exams from "./pages/school/examStudent/examS";
import ExamsT from "./pages/school/examTeacher/examT";
import Profile from "./pages/school/profile/profile";
import Subjects from "./pages/school/subjects/subjects";
import Submit from "./pages/school/homework/submit/submit";
// import Register from "./pages/emmerce/register/register";
// import Products from "./pages/emmerce/products/products";
import Navigation from "./components/navbar/navbar";
import SchoolHome from "./pages/school/schoolHome/schoolHome";
import Attendance from "./pages/school/attendance/attendance";
import HomeStudent from "./pages/school/homeStudent/homeStudent";
import HomeTeacher from "./pages/school/homeTeacher/homeTeacher";
// import EditProducts from "./pages/emmerce/editProducts/editProducts";

import ParticlesBackground from "./components/particles/particles";

import { useDispatch } from "react-redux";
import { keepLoginAction } from "./store/action/action";

function App() {
    const [isStorageChecked, setIsStorageChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const usersLocalStorage = localStorage.getItem("userData");

        if (usersLocalStorage) {
        const userData = JSON.parse(usersLocalStorage);
        const { user_id, username, role, fullname, stream_id } = userData;
        dispatch(keepLoginAction({ user_id, username, role, fullname, stream_id }));
        }

        setIsStorageChecked(true);
    }, []);

    if (isStorageChecked) {
    return (
        <>
        <Router>
            <Navigation />
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<SchoolHome />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/email" element={<Email />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/events" element={<Events />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/submit-hw" element={<Submit />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/exam-teacher" element={<ExamsT />} />
                {/* <Route path="/reg" element={<Register />} /> */}
                {/* <Route path="/add" element={<AddProducts />} /> */}
                {/* <Route path="/products" element={<Products />} /> */}
                <Route path="/homework" element={<Homework />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/home-student" element={<HomeStudent />} />
                <Route path="/home-teacher" element={<HomeTeacher />} />
                {/* <Route path="/edit-products" element={<EditProducts />} /> */}
                <Route path="/particles" element={<ParticlesBackground />} />
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