import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPostsThunk, getOnePostThunk, upvotePostThunk, downvotePostThunk } from "../../store/post"

import OpenModalButton from "../OpenModalButton";
import DeletePostModal from "../DeletePostModal";


function UserPosts({ userPost, user }) {
    const dispatch = useDispatch();
    const postDate = userPost.created_at.split(' ').slice(0,4).join(' ');
    const sessionUser = useSelector((state) => state.session.user);
    const [toggle, setToggle] = useState(false);
    const [upvoted, setUpvoted] = useState(userPost?.upvotes?.some((upvote) => upvote.user_id === sessionUser?.id))
    const [downvoted, setDownvoted] = useState(userPost?.downvotes?.some((downvote) => downvote.user_id === sessionUser?.id))
    const [isTruncated, setIsTruncated] = useState(true);
    const post = useSelector((state) => state.post.currentPost)

    // Function to toggle the truncation state
    const toggleTruncation = () => {
      setIsTruncated(!isTruncated);
    };

    useEffect(() => {
        dispatch(getOnePostThunk(userPost.id))
      }, []);


    console.log("🍊 posts: ", userPost)

    const handleUpvote = async () => {
      const hasUpvoted = userPost?.upvotes?.some((upvote) => upvote.user_id === sessionUser?.id);
  
      if (hasUpvoted) {
        // Remove upvote (undo upvoting)
        const updatedPost = await dispatch(upvotePostThunk(userPost.id, false));
        dispatch(getOnePostThunk(userPost.id)); // Fetch updated post data
        setUpvoted(false);
      } else if (downvoted && !hasUpvoted) {
        const updatedUpvote = await dispatch(upvotePostThunk(userPost.id, true));
        const updatedDownvote = await dispatch(downvotePostThunk(userPost.id, false));
        dispatch(getOnePostThunk(userPost.id)); // Fetch updated post data
        setDownvoted(false);
        setUpvoted(true);
      } else {
        // Add upvote
        const updatedPost = await dispatch(upvotePostThunk(userPost.id, true));
        dispatch(getOnePostThunk(userPost.id)); // Fetch updated post data
        setUpvoted(true);
      }
    };
  
    const handleDownvote = async () => {
      const hasDownvoted = userPost?.downvotes?.some((downvote) => downvote.user_id === sessionUser?.id);
  
      if (hasDownvoted) {
        // Remove downvote (undo downvoting)
        const updatedPost = await dispatch(downvotePostThunk(userPost.id, false));
        dispatch(getOnePostThunk(userPost.id)); // Fetch updated post data
        setDownvoted(false);
      } else if (upvoted && !hasDownvoted) {
        const updatedUpvote = await dispatch(upvotePostThunk(userPost.id, false));
        const updatedDownvote = await dispatch(downvotePostThunk(userPost.id, true));
        dispatch(getOnePostThunk(userPost.id)); // Fetch updated post data
        setDownvoted(true);
        setUpvoted(false);
      } else {
        // Add downvote
        const updatedPost = await dispatch(downvotePostThunk(userPost.id, true));
        dispatch(getOnePostThunk(userPost.id)); // Fetch updated post data
        setDownvoted(true);
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
            <div style={{ position: "relative" }}>
              <div
                className={`linebreaks-on post-content ${
                  isTruncated ? "truncated" : "expanded"
                }`}
              >
                {userPost.content}
              </div>
              {isTruncated && (
                <span className="user-profile-more-link" onClick={toggleTruncation}>
                  (more)
                </span>
              )}
            </div>
            
            <div className="edit-question-container" style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1em"}}>
                {/* UP AND DOWN VOTE */}
                <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                    <div className="updown-vote">
                        <div onClick={handleUpvote} className={upvoted ? "upvoted" : ''} style={{ cursor: "pointer"}}>
                            <i className="fa-solid fa-arrow-up"></i>
                            <span className="upvotes-text">Upvote</span>
                            <span style={{margin: "0 -15px"}}>・</span>
                            <span className="upvotes-length">{post?.upvotes?.length}</span>
                        </div>
                        <div onClick={handleDownvote} className={downvoted ? "downvoted" : ""} style={{ cursor: "pointer" }}>
                            <i className="fa-solid fa-arrow-down"></i>
                        </div>
                    </div>
                <i onClick={() => setToggle(!toggle)} className="comment fa-regular fa-comment"></i>
                </div> <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeletePostModal post={userPost}/>}
                />     
            </div>
        </div>
    )
}

export default UserPosts;