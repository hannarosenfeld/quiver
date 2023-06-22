import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";

import { NavLink } from "react-router-dom";

import OpenModalButton from "../OpenModalButton";
import EditQuestionModal from "../EditQuestionModal"
import DeleteQuestionModal from "../DeleteQuestionModal";
import "./QuestionsList.css"

function QuestionsList() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const questionsObj = useSelector(state => state.question.question.questions)
    const questions = Object.values(questionsObj)
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])


    return (
        <div className="wrapper">
                <div className="homepage-wrapper">
                    <div className="question-list-wrapper">
                        <ul>
                            {questions.map(question => (
                                <li key={question.id}>
                                {question.answer.length ? (
                                <div style={{display: "flex", gap:"0.5em", marginBottom: "1em"}}>
                                    <div className="profile-pic"
                                        style={{
                                            backgroundImage: `url(${question.answer[0].user.profile_pic})`, 
                                            backgroundSize: "40px", 
                                            backgroundPosition: "center",
                                        }}>
                                    </div>
                                    <div style={{fontSize: "0.8em", fontWeight: "600"}}>
                                        {console.log("⚾️",question)}
                                        <span>{question.answer[0].user.username}</span>
                                        <span>{question.answer[0].created_at}</span>
                                    </div>
                                </div>
                                ) : ''}
                                    <h4><NavLink to={`/questions/${question.id}`}>{question.title}</NavLink></h4>
                                    {question.answer.length ? (
                                        <div style={{fontSize: "0.9em",paddingTop: "0.5em"}}>
                                            {question.answer[0].answer}
                                        </div>
                                    ) : ''}
                                    <div className="edit-question-container">
                                            {sessionUser.id === question.user.id ? <OpenModalButton
                                            buttonText="Delete"
                                            modalComponent={<DeleteQuestionModal question={question}
                                            />}
                                        /> : ''}                                        
                                            {sessionUser.id === question.user.id ? <OpenModalButton
                                            buttonText="Edit"
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