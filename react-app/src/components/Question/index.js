import { getAllAnswersThunk } from "../../store/answer";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import OpenModalButton from "../OpenModalButton";
import "./Question.css"
import EditQuestionModal from "../EditQuestionModal"
import DeleteQuestionModal from "../DeleteQuestionModal";
import { NavLink } from "react-router-dom";


function Question({ question }) {
    const answersObj = useSelector(state => state.answer)
    const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
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
        dispatch(getAllAnswersThunk(question.title))
    }, [dispatch])

    return(
        <div>
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
            <h4><NavLink to={`/questions/${question.title.split(" "). join("-")}`}>{question.title}</NavLink></h4>
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
        </div>
    )
}

export default Question