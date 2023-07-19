import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../OpenModalButton";
import EditQuestionModal from "../EditQuestionModal"
import DeleteQuestionModal from "../DeleteQuestionModal";

import "./Question.css"

function Question({ question }) {
    const sessionUser = useSelector(state => state.session.user);

    console.log("🐩 created at", question.answer[0]?.created_at)

    return(
        <div className="question-wrapper">
        {question.answer.length ? (
            <div style={{display: "flex", gap:"0.5em", marginBottom: "1em"}}>
                <div className="profile-pic"
                    style={{
                        backgroundImage: `url(${question.answer[0].user.profile_pic})`, 
                        backgroundSize: "40px", 
                        backgroundPosition: "center",
                    }}>
                </div>
                <div style={{fontSize: "0.8em", display: "flex", flexDirection: "column"}}>
                    <span style={{fontWeight: "bold"}}>{question.answer[0].user.username}</span>
                    {question.answer[0].created_at ? <span>{question.answer[0]?.created_at.split(' ').slice(0,4).join(' ')}</span> : ''}
                </div>
            </div>
            ) : ''}
                <h4><NavLink to={`/questions/${question.id}`}>{question.title}</NavLink></h4>
                {question.answer.length ? (
                    <div style={{fontSize: "0.9em",paddingTop: "0.5em", whiteSpace: "pre-wrap"}}>
                        {question.answer[0].answer}
                    </div>
                ) : ''}
                <div className="edit-question-container">
                        {sessionUser.id === question.user.id ? <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteQuestionModal question={question}/>}
                    /> : ''}                                        
                        {sessionUser.id === question.user.id ? <OpenModalButton
                        buttonText="Edit"
                        modalComponent={<EditQuestionModal question={question}/>}
                    /> : ''}
                </div>
        </div>
    )
}

export default Question