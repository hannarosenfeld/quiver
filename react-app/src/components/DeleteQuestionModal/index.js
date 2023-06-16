import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteQuestionThunk, getAllQuestionsThunk } from "../../store/question"

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
        <div>
            <h3>Delete answer</h3>
            <p>Are you sure you want to permanetly delete this question?</p>
            <button type="submit" onClick={handleDelete }>Delete</button>
        </div>
    )
}

export default DeleteQuestionModal;