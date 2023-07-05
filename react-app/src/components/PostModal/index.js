import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

function PostModal() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [content, setContent] = useState("")
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postDetails = {
            content
        }

        // const addAnswerDispatch = await dispatch(addNewAnswerThunk(question.id, answerDetails))
        // await dispatch(getAllAnswersThunk(question.id))
        // await dispatch(getAllQuestionsThunk())

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
                <textarea className="answer-text"
                    rows="15"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PostModal;