import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateQuestionThunk, getAllQuestionsThunk } from "../../store/question"

function DeleteQuestionModal({question}) {
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
            <h3>Delete answer</h3>
            <p>Are you sure you want to permanetly delete this question?</p>
            <button type="submit">Save</button>
        </div>
    )
}

export default DeleteQuestionModal;