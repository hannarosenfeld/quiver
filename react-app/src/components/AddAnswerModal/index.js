import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import answerReducer, { addNewAnswerThunk, getAllAnswersThunk } from "../../store/answer"
import { getAllQuestionsThunk } from "../../store/question";
import "./AddAnswerModal.css"

function AddAnswerModal({ question }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [answer, setAnswer] = useState("")
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const answerDetails = {
            answer
        }

        const addAnswerDispatch = await dispatch(addNewAnswerThunk(question.id, answerDetails))
        await dispatch(getAllAnswersThunk(question.id))
        await dispatch(getAllQuestionsThunk())

        closeModal()
    }

    return (
        <div className="add-answer-modal">
            <div style={{display: "flex", gap: "0.5em", fontSize: "0.9em"}}>
                <div className="profile-pic-user-account-link"
                    style={{
                        backgroundImage: `url(${user.profile_pic})`, 
                        backgroundSize: "50px", 
                        backgroundPosition: "center",
                        marginBottom: "1em"
                    }}>
                </div>
                <span>{user.username}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <label>{question.title}</label>
                <textarea className="answer-text"
                    rows="15"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your answer"
                    required
                />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default AddAnswerModal;