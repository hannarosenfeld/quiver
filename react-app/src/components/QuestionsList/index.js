import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import OpenModalButton from "../OpenModalButton";
import "./QuestionsList.css"
import EditQuestionModal from "../EditQuestionModal"
import DeleteQuestionModal from "../DeleteQuestionModal";

function QuestionsList() {
    const questionsObj = useSelector(state => state?.question?.question?.questions)
    const questions = Object.values(questionsObj)
	const sessionUser = useSelector(state => state.session.user);

    console.log("👩🏻‍💻",sessionUser)

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
  
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
  
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };
  
      document.addEventListener("click", closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

  
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    console.log("object: ",questionsObj)
    console.log("array", questions)

    return (
        <div className="wrapper">
                <div className="homepage-wrapper">
                    <div className="question-list-wrapper">
                        <ul>
                            {questions.map(question => (
                                <li key={question.id}>
                                    <div className="question-user-info">
                                        <div className="profile-pic"
                                         style={{
                                            backgroundImage: `url(${question.user.profile_pic})`, 
                                            backgroundSize: "50px", 
                                            backgroundPosition: "center"
                                            }}>
                                        </div>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <span className="username">{question.user.username}</span>
                                            <span>{question.created_at.slice(0,-12)}</span>
                                        </div>
                                    </div>
                                    <h4>{question.title}</h4>
                                    <div className="edit-question-container">
                                    {sessionUser.id === question.user.id ? <OpenModalButton
                                            buttonText="Delete"
                                            onItemClick={closeMenu}
                                            modalComponent={<DeleteQuestionModal question={question}
                                            />}
                                        /> : ''}                                        
                                      {sessionUser.id === question.user.id ? <OpenModalButton
                                            buttonText="Edit"
                                            onItemClick={closeMenu}
                                            modalComponent={<EditQuestionModal question={question}
                                            />}
                                        /> : ''}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>
        </div>
    )
}

export default QuestionsList;