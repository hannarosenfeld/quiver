import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css"

function ProfilePage() {
    const sessionUser = useSelector(state => state.session.user);
    const [active, setActive] = useState(false);

    const handleMouseOver = (e) => {
        setActive(true);

      };
    
      const handleMouseOut = () => {
        setActive(false);
      };

    return (
        <div className="wrapper">
            <div style={{display: "flex", gap: "30px"}}>
                {/* TODO: align pen on top of pic with CSS grid */}
                <div style={{display: "flex"}}>
                    <div 
                        onMouseOver={handleMouseOver}
                        onMouseOut ={handleMouseOut}
                        style={{
                            backgroundImage: `url(${sessionUser.profile_pic})`, 
                            backgroundSize: "150px", 
                            backgroundPosition: "center",
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            marginBottom: "0.5em",
                            backgroundSize:"cover",
                            display: "flex"

                        }}>
                        <div 
                            className={ active ? "visible" : "hidden"}
                            style={{
                                display: "flex",
                                width: "40px",
                                height: "40px",
                                margin: "0 auto",
                                alignSelf: "center",
                                background: "transparent",
                                verticalAlign: "top",
                                margin: "0 auto",
                                borderRadius: "50%",
                                display: "flex",
                                background: "#195aff"
                            }}
                        >
                            <form
                                style={{
                                    margin: "0 auto",
                                    alignSelf: "center",
                                    background: "transparent",
                                    verticalAlign: "top",
                                    fontSize: "20px",
                                    maxWidth: "100%"
                                }}
                            >
                                <label>
                                    <i class="fa-solid fa-pen"></i>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>{sessionUser.username}</h2>
                </div>
            </div>
            <div className="profile-panel">
                <ul style={{display: "flex", gap: "15px", fontSize: "13px", fontWeight: "bold", marginTop: "12px"}}>
                    <li>Profile</li>
                    <li>Answers</li>
                    <li>Questions</li>
                    <li>Posts</li>
                </ul>
            </div>
        </div>
    )
}

export default ProfilePage;