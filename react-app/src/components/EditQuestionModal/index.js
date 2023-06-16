import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./EditQuestionModal.css"
import { updateQuestionThunk, getAllQuestionsThunk } from "../../store/question"

function EditQuestionModal({question}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(question.title);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const questionDetails = {
            title
        }

        const newQuestionDispatch = await dispatch(updateQuestionThunk(questionDetails, question.id))
        await dispatch(getAllQuestionsThunk())
        closeModal()

    }

    return (
        <div>
            <form 
                onSubmit={handleSubmit}
                style={{height: "12em", width: "600px", display: "flex", flexDirection: "column", padding: "2em"}}>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{height: "3em"}}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditQuestionModal;