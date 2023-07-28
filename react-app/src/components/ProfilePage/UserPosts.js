import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPostsThunk, upvotePostThunk, downvotePostThunk } from "../../store/post";
import { addNewCommentThunk } from "../../store/comment";

import OpenModalButton from "../OpenModalButton";
import DeletePostModal from "../DeletePostModal";


function UserPosts({ post, user }) {
    const sessionUser = user;
    const dispatch = useDispatch();
    const postDate = post.created_at.split(' ').slice(0,4).join(' ');
    const [toggle, setToggle] = useState(false);
    const [comment, setComment] = useState("");
    const [isTruncated, setIsTruncated] = useState(true);    
    const [upvoted, setUpvoted] = useState(post.upvotes.some((upvote) => upvote.user_id === user?.id))
    const [downvoted, setDownvoted] = useState(post.downvotes.some((downvote) => downvote.user_id === user?.id))
  
    // Function to toggle the truncation state
    const toggleTruncation = () => {
        setIsTruncated(!isTruncated);
    };

    useEffect(() => {
        dispatch(getAllPostsThunk());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentDetails = {
        comment,
        };

        const newCommentDispatch = await dispatch(addNewCommentThunk(post.id, commentDetails));
        await dispatch(getAllPostsThunk());
        setComment("");
    };

    const handleUpvote = async () => {
        const hasUpvoted = post.upvotes.some((upvote) => upvote.user_id === sessionUser?.id);
    
        // Toggle upvoting/undo upvoting by clicking on Upvote
        if (hasUpvoted) {
          // Remove upvote (undo upvoting)
          const updatedPost = await dispatch(upvotePostThunk(post.id, false)); // Change the second argument to `false`
          await dispatch(getAllPostsThunk())
          setUpvoted(false)
        } else if (downvoted && !hasUpvoted) {
          const updatedUpvote = await dispatch(upvotePostThunk(post.id, true)); // add upvote
          const updatedDownvote = await dispatch(downvotePostThunk(post.id, false)); // remove downvote
          await dispatch(getAllPostsThunk())
          setDownvoted(false)
          setUpvoted(true)
        } else {
          // Add upvote
          const updatedPost = await dispatch(upvotePostThunk(post.id, true)); // Change the second argument to `true`
          await dispatch(getAllPostsThunk())
          setUpvoted(true)
        }
      };
    
      const handleDownvote = async () => {
        console.log("⛑️")
        const hasDownvoted = post.downvotes.some((downvote) => downvote.user_id === sessionUser?.id);
    
        // Toggle downvoting/undo downvoting by clicking on downvote
        if (hasDownvoted) {
          // Remove downvote (undo downvoting)
          const updatedPost = await dispatch(downvotePostThunk(post.id, false)); // Change the second argument to `false`
          await dispatch(getAllPostsThunk())
          setDownvoted(false)
        } else if (upvoted && !hasDownvoted) {
          const updatedUpvote = await dispatch(upvotePostThunk(post.id, false)); // undo upvote
          const updatedDownvote = await dispatch(downvotePostThunk(post.id, true)); // add downvote
          await dispatch(getAllPostsThunk())
          setDownvoted(true)
          setUpvoted(false)
        } else {
          // Add downvote
          const updatedPost = await dispatch(downvotePostThunk(post.id, true)); // Change the second argument to `true`
          await dispatch(getAllPostsThunk())
          setDownvoted(true)
        }
      };

    return (
        <div className="user-post">
            <div style={{display: "flex", gap:"0.5em", marginBottom: "1em"}}>
                <div className="profile-pic"
                    style={{
                        backgroundImage: `url(${user.profile_pic})`, 
                        backgroundSize: "40px", 
                        backgroundPosition: "center",
                    }}>
                </div>
                <div style={{fontSize: "14px", display: "flex", flexDirection: "column"}}>
                    <span style={{fontWeight: "600"}}>{user.username}</span>
                    <span>{postDate}</span>
                </div>
            </div>
            <div style={{fontSize: "15px"}} className="linebreaks-on">{post.content}</div>
            
            <div className="edit-question-container" style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1em"}}>
                {/* UP AND DOWN VOTE */}
                <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                    <div className="updown-vote">
                        <div className="upvote"><i class="comment fa-solid fa-arrow-up"></i><span>Upvote</span></div>
                        <div onClick={handleDownvote} className={downvoted ? "downvoted" : ""}><i class="fa-solid fa-arrow-down" style={{ cursor: "pointer" }}></i></div>
                </div>
                <i onClick={() => setToggle(!toggle)} className="comment fa-regular fa-comment"></i>
                </div> <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeletePostModal post={post}/>}
                />     
            </div>
        </div>
    )
}

export default UserPosts;