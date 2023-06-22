import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteQuestionThunk, getAllQuestionsThunk } from "../../store/question"
import "./DeleteQuestionModal.css"

function DeleteQuestionModal({ question }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    const handleDelete = async () => {
        const deleteQuestionDispatch = await dispatch(deleteQuestionThunk(question.id))
        await dispatch(getAllQuestionsThunk())
        closeModal()
    }

    return (
        <div className="delete-question">
            <h3>Delete Question</h3>
            <p>Are you sure you want to permanetly delete this question?</p>
            <button type="submit" onClick={handleDelete }>Delete</button>
        </div>
    )
}

export default DeleteQuestionModal;