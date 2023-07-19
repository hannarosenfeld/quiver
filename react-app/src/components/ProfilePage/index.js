import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePicThunk, getUserThunk } from "../../store/user";

import "./ProfilePage.css";
import UserQuestions from "./UserQuestions";
import UserAnswers from "./UserAnswers"
import UserPosts from "./UserPosts"

function ProfilePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const user = useSelector((state) => state.user.users.undefined);
    const [questionsActive, setQuestionsActive] = useState(false)
    const [answersActive, setAnswersActive] = useState(false)
    const [postsActive, setPostsActive] = useState(false)
    const [profilePic, setProfilePic] = useState(null);
    const [active, setActive] = useState(false);


    const handleMouseOver = (e) => {
    setActive(true);
    };

    const handleMouseOut = () => {
    setActive(false);
    };

    useEffect(() => {
    dispatch(getUserThunk(sessionUser?.id));
    }, [dispatch, sessionUser.id]);

    useEffect(() => {
    if (profilePic) {
        const formData = new FormData();
        formData.append("profile_pic", profilePic);

        dispatch(changeProfilePicThunk(sessionUser.id, formData))
        .then((updatedProfilePic) => {
            setProfilePic(null);
            dispatch(getUserThunk(sessionUser.id)); // Re-fetch user data to get updated profile picture
        })
        .catch((error) => {
            // Handle any error from the API call if needed
            console.error("Error updating profile picture:", error);
        });
    }
    }, [dispatch, profilePic, sessionUser.id]);

    return (
        
    <div className="wrapper">
        <div style={{ display: "flex", gap: "30px"}}>
        <div style={{ display: "flex", cursor: "pointer" }}>
            <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{
                backgroundImage: user?.profile_pic
                ? `url(${user.profile_pic})`
                : "initial",
                backgroundSize: "150px",
                backgroundPosition: "center",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                marginBottom: "0.5em",
                backgroundSize: "cover",
                display: "flex",
            }}
            >
            <div
                className={active ? "visible" : "hidden"}
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
                background: "#195aff",
                }}
            >
                <form
                style={{
                    margin: "0 auto",
                    alignSelf: "center",
                    background: "transparent",
                    verticalAlign: "top",
                    fontSize: "20px",
                    maxWidth: "100%",
                    cursor: "pointer",
                }}
                >
                <label style={{ cursor: "pointer" }}>
                    <i class="fa-solid fa-pen"></i>
                    <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                </label>
                </form>
            </div>
            </div>
        </div>
        <div>
            <h2>{user ? <div>{user.username}</div> : ""}</h2>
        </div>
        </div>
        <div className="profile-panel">
        <ul
            style={{
            display: "flex",
            gap: "15px",
            fontSize: "13px",
            fontWeight: "bold",
            marginTop: "12px",
            }}
        >
            <li>Profile</li>
            <li 
                className={answersActive ? "panel-item-active" : ''}
                onClick={() => {
                    setQuestionsActive(false)
                    setPostsActive(false)
                    setAnswersActive(true)}
                }
            ><span>{user?.answers.length}</span> Answers</li>
            <li 
                className={questionsActive ? "panel-item-active" : ''}
                onClick={() => {
                    setAnswersActive(false)
                    setPostsActive(false)
                    setQuestionsActive(true)}
                }
            ><span>{user?.questions.length}</span> Questions</li>
            <li 
                className={postsActive ? "panel-item-active" : ''}
                onClick={() => {
                    setAnswersActive(false)
                    setQuestionsActive(false)
                    setPostsActive(true)
                    }
                }
            ><span>{user?.posts.length}</span> Posts</li>
        </ul>
        </div>
        <div>
        <div>
            {user?.questions.length > 0 && questionsActive && (
                <ul>
                    {user.questions.map(question => (
                        <li key={question.id}><UserQuestions question={question}/></li>
                    ))}
                </ul>
            )}
        </div>
        <div>
            {user?.answers?.length > 0 && answersActive && (
                <ul>
                    {user.answers.map(answer => (
                        <div>
                          <li key={answer.id}><UserAnswers answer={answer} user={user}/></li>
                        </div>
                    ))}
                </ul>
            )}
        </div>
        <div>
            {user?.posts.length > 0 && postsActive && (
                <ul>
                    {user.posts.map(post => (
                        <li key={post.id}><UserPosts post={post} user={user} /></li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    </div>
  );
}

export default ProfilePage;
