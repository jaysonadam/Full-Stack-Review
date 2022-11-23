import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import axios from "../../../config/axios";

function Exams() {
    const { user_id, fullname } = useSelector((state) => state.auth);
    return (
        <>
            <h1>Exams</h1>
            <h2>{user_id} {fullname}</h2>
        </>
    )
}

export default Exams;