import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAllQuestionsThunk } from "../../store/question"
import { deleteAnswerThunk, getAllAnswersThunk } from "../../store/answer"
import "./DeleteAnswerModal.css"

function DeleteAnswerModal({ answerId, questionId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
//    const answers = useSelector(state => state.answer.answers)


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
            <p>Are you sure you want to permanetly delete this answer?</p>
            <button type="submit" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeleteAnswerModal;