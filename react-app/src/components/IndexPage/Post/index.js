import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useModal } from "../../../context/Modal";

import { getAllPostsThunk, upvotePostThunk, downvotePostThunk } from "../../../store/post";
import { addNewCommentThunk } from "../../../store/comment";

import OpenModalButton from "../../OpenModalButton";
import DeletePostModal from "../../DeletePostModal";
import DeleteCommentModal from "../../DeleteCommentModal";

import "./Post.css";


function Post({ post }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const postDate = post.created_at ? post.created_at.split(" ").slice(0, 4).join(" ") : "";
  const [toggle, setToggle] = useState(false);
  const [comment, setComment] = useState("");
  const [isTruncated, setIsTruncated] = useState(true);
  const [upvoted, setUpvoted] = useState(post.upvotes.some((upvote) => upvote.user_id === sessionUser?.id))
  const [downvoted, setDownvoted] = useState(post.downvotes.some((downvote) => downvote.user_id === sessionUser?.id))

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
    console.log(hasUpvoted)
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
    const hasDownvoted = post.downvotes.some((downvote) => downvote.user_id === sessionUser?.id);
    console.log(hasDownvoted)
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
    <div className="outer-post-wrapper">
      <div className="post-wrapper">
        {post.content && post.content.length > 0 ? (
          <div style={{ display: "flex", gap: "0.5em", marginBottom: "1em" }}>
            <div
              className="profile-pic"
              style={{
                backgroundImage: `url(${post.user?.profile_pic})`,
                backgroundSize: "40px",
                backgroundPosition: "center",
              }}
            ></div>
            <div style={{ fontSize: "0.8em", display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "bold" }}>{post.user?.username}</span>
              <span>{postDate}</span>
            </div>
          </div>
        ) : null}

        {post.title ? (
          <h4>
            <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
          </h4>
        ) : null}

        {post.content && post.content.length > 0 ? (
          <div style={{ position: "relative" }}>
            <div
              className={`linebreaks-on post-content ${
                isTruncated ? "truncated" : "expanded"
              }`}
            >
              {post.content}
            </div>
            {isTruncated && (
              <span className="more-link" onClick={toggleTruncation}>
                (more)
              </span>
            )}
          </div>
        ) : null}

        <div
          className="edit-question-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1em",
          }}
        >
          {/* UP AND DOWN VOTE */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div className="updown-vote">
              <div onClick={handleUpvote} className={upvoted ? "upvoted" : ''} style={{ cursor: "pointer" }}>
                <i className="fa-solid fa-arrow-up"></i>
                <span>Upvote</span>
              </div>
              <div onClick={handleDownvote} className={downvoted ? "downvoted" : ""} style={{ cursor: "pointer" }}>
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
            <i
              onClick={() => setToggle(!toggle)}
              className="comment fa-regular fa-comment"
            ></i>
          </div>
          {sessionUser && post.user?.id === sessionUser?.id ? (
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeletePostModal post={post} />}
            />
          ) : null}
        </div>
      </div>
      {toggle && (
        <div className="comment-section">
          <form onSubmit={handleSubmit}>
            <div
              className="profile-pic"
              style={{
                backgroundImage: `url(${post.user?.profile_pic})`,
                backgroundSize: "40px",
                backgroundPosition: "center",
              }}
            ></div>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              required
            />
            <button>Add Comment</button>
          </form>
          {post.comments.length > 0 && (
            <ul className="comments">
              {post.comments.map((e) => (
                <li key={e.comment.id} style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div
                      className="profile-pic"
                      style={{
                        backgroundImage: `url(${e.user?.profile_pic})`,
                        backgroundSize: "40px",
                        backgroundPosition: "center",
                        marginRight: "1em",
                      }}
                    ></div>
                    <div style={{ marginTop: "-0.25em", width: "100%" }}>
                      <p style={{ fontWeight: "bold", marginBottom: "0.2em" }}>{e.user?.username}</p>
                      <div>{e.comment}</div>
                    </div>
                  </div>
                  <div className="edit-question-container" style={{ marginBottom: "0.1em" }}>
                    {sessionUser && post.user?.id === e.user?.id ? (
                      <OpenModalButton
                        buttonText="Delete"
                        modalComponent={
                          <DeleteCommentModal commentId={e.id} postId={e.post_id} />
                        }
                      />
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
