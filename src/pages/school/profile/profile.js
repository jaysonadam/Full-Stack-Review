import React from "react";
import { useSelector } from "react-redux";

function Profile() {
    const { fullname, id  } = useSelector((state) => state.auth);

    return (
        <div>
            <h1>Student Profile</h1>
            <div className="d-flex justify-content-center my-5">
                <div className="d-flex flex-column">
                    <h3 className="mt-3">Fullname: {fullname}</h3>
                    <h3 className="mt-3">Student ID: {id}</h3>
                </div>
            </div>
        </div>
    )
}

export default Profile;