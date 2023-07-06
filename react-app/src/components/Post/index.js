import { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";

import { deletePostThunk, getAllPostsThunk } from "../../store/post"

import OpenModalButton from "../OpenModalButton";
import DeletePostModal from "../DeletePostModal";


function Post({ post }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    return(
        <div>
            {post.content.length ? (
                <div style={{display: "flex", gap:"0.5em", marginBottom: "1em"}}>
                    <div className="profile-pic"
                        style={{
                            backgroundImage: `url(${post.user.profile_pic})`, 
                            backgroundSize: "40px", 
                            backgroundPosition: "center",
                        }}>
                    </div>
                    <div style={{fontSize: "0.8em", fontWeight: "600"}}>
                        <span>{post.user.username}</span>
                        {/* <span>{post.created_at}</span> */}
                    </div>
                </div>
                ) : ''}
                <h4><NavLink to={`/posts/${post.id}`}>{post.title}</NavLink></h4>
                {post.content.length ? (
                    <div style={{fontSize: "0.9em",paddingTop: "0.5em"}}>
                        {post.content}
                    </div>
                ) : ''}
                <div className="edit-question-container" style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1em"}}>
                    <i className="fa-regular fa-comment" style={{cursor: "pointer"}}></i>
                    {sessionUser.id === post.user.id ? <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeletePostModal post={post}/>}
                    /> : ''}     
                </div>
        </div>
    )
}

export default Post