import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { getAllPostsThunk } from "../../store/post";
import { deleteCommentThunk } from "../../store/comment";

function DeleteCommentModal({ commentId, postId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
//    const answers = useSelector(state => state.answer.answers)


    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    const handleDelete = async () => {
        const deleteCommentDispatch = await dispatch(deleteCommentThunk(postId, commentId))
        await dispatch(getAllPostsThunk())
        // await dispatch(getAllAnswersThunk(questionId))
        closeModal()
    }

    return (
        <div className="delete-question">
            <h3>Delete comment</h3>
            <p>Are you sure you want to permanetly delete this comment?</p>
            <button type="submit" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeleteCommentModal;