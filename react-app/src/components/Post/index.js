import { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";

import { deletePostThunk, getAllPostsThunk } from "../../store/post"

import OpenModalButton from "../OpenModalButton";
import DeletePostModal from "../DeletePostModal";

import "./Post.css"


function Post({ post }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [toggle, setToggle] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    console.log("🧵 post", post)

    return(
        <div className="outer-post-wrapper">
            <div className="post-wrapper">
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
                        <i onClick={() => setToggle(!toggle)}className="fa-regular fa-comment" style={{cursor: "pointer", marginTop: "0.5em"}}></i>
                        {sessionUser.id === post.user.id ? <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeletePostModal post={post}/>}
                        /> : ''}     
                    </div>
            </div>
            { toggle && (
                <div className="comment-section">
                    <form>
                        <div className="profile-pic"
                            style={{
                                backgroundImage: `url(${sessionUser.profile_pic})`, 
                                backgroundSize: "40px", 
                                backgroundPosition: "center",
                            }}>
                        </div>
                        <input
                            type="text"
                            // value={title}
                            // onChange={(e) => setTitle(e.target.value)}
                            placeholder='Add a comment...'
                            required
                        />
                        <button>Add Comment</button>
                    </form>
                    {post.comment.length > 0 && (
                    <ul className="comments">
                        {post.comment.map(e => (
                            <li key={e.comment.id}>
                                <div className="profile-pic"
                                    style={{
                                        backgroundImage: `url(${e.user.profile_pic})`, 
                                        backgroundSize: "40px", 
                                        backgroundPosition: "center",
                                    }}>
                                </div>
                                <div style={{marginTop: "-0.25em"}}>
                                    <p style={{fontWeight: "bold", marginBottom: "0.2em"}}>{e.user.username}</p>
                                    <div>{e.comment}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
            )}
         </div>
    )
}

export default Post