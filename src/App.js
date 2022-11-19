import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/emmerce/homeProducts/home";
import Email from "./pages/school/email/email";
import About from "./pages/school/about/about";
// import AddProducts from "./pages/emmerce/add/add";
import Homework from "./pages/school/homework/hw";
import Edit from "./pages/school/editProfile/edit";
import Exams from "./pages/school/exam/exam";
import Events from "./pages/school/event/event";
// import Register from "./pages/emmerce/register/register";
// import Products from "./pages/emmerce/products/products";
import Navigation from "./components/navbar/navbar";
import Attendance from "./pages/school/attendance/attendance";
import HomeSchool from "./pages/school/homeSchool/homeSchool";
import LoginTeacher from "./pages/school/loginTeacher/loginTeacher";
import LoginStudent from "./pages/school/loginStudent/loginStudent";
// import EditProducts from "./pages/emmerce/editProducts/editProducts";

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
                {/* <Route path="/" element={<Home />} /> */}emmerce/
                <Route path="/" element={<HomeSchool />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/email" element={<Email />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                {/* <Route path="/reg" element={<Register />} /> */}
                {/* <Route path="/add" element={<AddProducts />} /> */}
                {/* <Route path="/products" element={<Products />} /> */}
                <Route path="/homework" element={<Homework />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/loginTeacher" element={<LoginTeacher />} />
                <Route path="/loginStudent" element={<LoginStudent />} />
                {/* <Route path="/edit-products" element={<EditProducts />} /> */}
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