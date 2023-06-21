import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewAnswerThunk } from "../../store/answer"
import "./AddAnswerModal.css"

function AddAnswerModal({ question }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [answer, setAnswer] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const answerDetails = {
            answer
        }

        const addAnswerDispatch = await dispatch(addNewAnswerThunk(question.id, answerDetails))
        console.log(addAnswerDispatch)
        // await dispatch(getAllAnswersThunk())
        setAnswer("")
        // closeModal()
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
            <form>
                <label>{question.title}</label>
                <textarea
                    rows="25"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                />
                <button type="submit" onClick={() => {handleSubmit()}}>Post</button>
            </form>
        </div>
    )
}

export default AddAnswerModal;