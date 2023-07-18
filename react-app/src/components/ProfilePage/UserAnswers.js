import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import EditAnswerModal from "../EditAnswerModal";
import { getAllQuestionsThunk } from "../../store/question"
import { deleteAnswerThunk, getAllAnswersThunk } from "../../store/answer"



function DeleteUserAnswerModal({ answerId, questionId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getAllAnswersThunk(questionId))
    }, [dispatch])

    const handleDelete = async () => {
        const deleteQuestionDispatch = await dispatch(deleteAnswerThunk(questionId, answerId))
        await dispatch(getAllQuestionsThunk())
        await dispatch(getAllAnswersThunk(questionId))
        closeModal()
    }

    return (
        <div className="delete-question">
            <h3>Delete answer</h3>
            <p>Are you sure you want to permanetly delete this answers?</p>
            <button type="submit" onClick={handleDelete}>Delete</button>
        </div>
    )
}


function UserAnswers({ answer, user }) {
    console.log("🐀 answer date", answer.created_at)

    const answerDate = answer.created_at.split(' ').slice(0,4).join(' ');

    return (
        <div className="user-answer">
            <div style={{display: "flex", gap:"0.5em", marginBottom: "1em"}}>
                <div className="profile-pic"
                    style={{
                        backgroundImage: `url(${user.profile_pic})`, 
                        backgroundSize: "40px", 
                        backgroundPosition: "center",
                    }}>
                </div>
                <div style={{fontSize: "14px", display: "flex", flexDirection: "column"}}>
                    <span style={{fontWeight: "600"}}>{user.username}</span>
                    <span>{answerDate}</span>
                </div>
            </div>
            <h4><NavLink to={`/questions/${answer.question_id}`}>{answer.question_title}</NavLink></h4>
            <div style={{padding: "10px 0", fontSize: "14px"}}>{answer.answer}</div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div className="updown-vote" style={{height: "30px"}}>
                    <div className="upvote"><i class="fa-solid fa-arrow-up"></i><span style={{marginLeft: "5px"}}>Upvote</span></div>
                    <div><i class="fa-solid fa-arrow-down"></i></div>
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    <OpenModalButton 
                        buttonText="Edit"
                        modalComponent={<EditAnswerModal answerToEdit={answer} question={answer.question_id}/>}
                    ></OpenModalButton>
                    <OpenModalButton 
                        buttonText="Delete"
                        modalComponent={<DeleteUserAnswerModal answerId={answer.id} questionId={answer.question_id}/>}
                    ></OpenModalButton>
                </div>
            </div>
        </div>
    )
}

export default UserAnswers;