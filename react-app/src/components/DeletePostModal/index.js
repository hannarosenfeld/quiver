import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePostThunk, getAllPostsThunk } from "../../store/post"

function DeletePostModal({ post }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    const handleDelete = async () => {
        const deletePostDispatch = await dispatch(deletePostThunk(post.id))
        await dispatch(getAllPostsThunk())
        closeModal()
    }

    return (
        <div className="delete-question">
            <h3>Delete post</h3>
            <p>Are you sure you want to permanetly delete this post?</p>
            <button type="submit" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeletePostModal;