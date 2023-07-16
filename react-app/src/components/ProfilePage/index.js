import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProfilePage() {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <div className="wrapper">
            <div style={{display: "flex", gap: "30px"}}>
                <div
                    style={{
                        backgroundImage: `url(${sessionUser.profile_pic})`, 
                        backgroundSize: "150px", 
                        backgroundPosition: "center",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        marginBottom: "0.5em",
                        backgroundSize:"cover"

                    }}>
                </div>
                <div>
                    <h2>{sessionUser.username}</h2>
                </div>
            </div>
            <div className="profile-panel">
                <ul style={{display: "flex", gap: "15px", fontSize: "13px", fontWeight: "bold"}}>
                    <li>Answers</li>
                    <li>Questions</li>
                    <li>Posts</li>
                </ul>
            </div>
        </div>
    )
}

export default ProfilePage;