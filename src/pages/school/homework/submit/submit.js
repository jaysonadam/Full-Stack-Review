import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "../../../../config/axios";

import moment from "moment";
import { Card, Button, Offcanvas, Dropdown } from "react-bootstrap";

function Submit() {
    return (
        <>
            <h1>Submitted Homeworks</h1>
        </>
    )
};

export default Submit;