import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { upvoteAnswerThunk, downvoteAnswerThunk, getOneAnswerThunk } from "../../../store/answer";

import OpenModalButton from "../../OpenModalButton";
import EditQuestionModal from "../../EditQuestionModal";
import DeleteQuestionModal from "../../DeleteQuestionModal";

import "./Question.css";


function Question({ question }) {
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const answer = useSelector((state) => state.answer.currentAnswer);
  const [isTruncated, setIsTruncated] = useState(true);
  const [toggle, setToggle] = useState(false);
  // console.log("🐩 answer", answer)
  const [upvoted, setUpvoted] = useState(answer.upvotes.some((upvote) => upvote.user_id === sessionUser?.id))
  const [downvoted, setDownvoted] = useState(answer.downvotes.some((downvote) => downvote.user_id === sessionUser?.id))

  console.log("🐳 question: ", question)
  useEffect(() => {
    if (question?.answer[0]?.id) {
      dispatch(getOneAnswerThunk(question.id, answer.id));
    } 
  }, [question])


  useEffect(() => {
    // Check if the contentRef is available
    if (contentRef.current) {
      const contentElement = contentRef.current;
      setIsTruncated(contentElement.scrollHeight > contentElement.clientHeight);
    }
  }, [contentRef]);

  // Function to toggle the truncation state
  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const handleUpvote = async () => {
    const hasUpvoted = answer.upvotes.some((upvote) => upvote.user_id === sessionUser?.id);
    console.log(hasUpvoted)
    // Toggle upvoting/undo upvoting by clicking on Upvote
    if (hasUpvoted) {
      // Remove upvote (undo upvoting)
      const updatedAnswer = await dispatch(upvoteAnswerThunk(question.id, answer.id, false));
      // await dispatch(getAllAnswersThunk())
      setUpvoted(false)
    } else if (downvoted && !hasUpvoted) {
      const updatedUpvote = await dispatch(upvoteAnswerThunk(question.id, answer.id, true)); // add upvote
      // const updatedDownvote = await dispatch(downvoteAnswerThunk(answer.id, false)); // remove downvote
      // await dispatch(getAllPostsThunk())
      setDownvoted(false)
      setUpvoted(true)
    } else {
      // Add upvote
      const updatedPost = await dispatch(upvoteAnswerThunk(question.id, answer?.id, true)); // Change the second argument to `true`
      // await dispatch(getAllAnswersThunk())
      setUpvoted(true)
    }
  };

  // const handleDownvote = async () => {
  //   const hasDownvoted = question.answer[0].downvotes.some((upvote) => upvote.user_id === sessionUser?.id);
  //   console.log(hasDownvoted)
  //   // Toggle downvoting/undo downvoting by clicking on downvote
  //   if (hasDownvoted) {
  //     // Remove downvote (undo downvoting)
  //     const updatedPost = await dispatch(downvotePostThunk(post.id, false)); // Change the second argument to `false`
  //     await dispatch(getAllPostsThunk())
  //     setDownvoted(false)
  //   } else if (upvoted && !hasDownvoted) {
  //     const updatedUpvote = await dispatch(upvotePostThunk(post.id, false)); // undo upvote
  //     const updatedDownvote = await dispatch(downvotePostThunk(post.id, true)); // add downvote
  //     await dispatch(getAllPostsThunk())
  //     setDownvoted(true)
  //     setUpvoted(false)
  //   } else {
  //     // Add downvote
  //     const updatedPost = await dispatch(downvotePostThunk(post.id, true)); // Change the second argument to `true`
  //     await dispatch(getAllPostsThunk())
  //     setDownvoted(true)
  //   }
  // };

  return (
    <div className="question-wrapper">
      {question.answer.length ? (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px"}}>
          <div
            className="profile-pic"
            style={{
              backgroundImage: `url(${question.answer[0].user.profile_pic})`,
              backgroundSize: "40px",
              backgroundPosition: "center",
            }}
          ></div>
          <div style={{ fontSize: "0.8em", display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>{question.answer[0].user.username}</span>
            {question.answer[0].created_at ? (
              <span>{question.answer[0]?.created_at.split(" ").slice(0, 4).join(" ")}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <h4>
        <NavLink to={`/questions/${question.id}`}>{question.title}</NavLink>
      </h4>

      {question.answer.length ? (
        <div
          className={`question-content ${isTruncated ? "truncated" : "expanded"}`}
          ref={contentRef}
        >
          {question.answer[0].answer}
          {isTruncated && (
            <span className="more-link-question" onClick={toggleTruncation}>
              (more)
            </span>
          )}
        </div>
      ) : (
        ""
      )}

      <div className="edit-question-container">
          {/* UP AND DOWN VOTE */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between"}}>
            {question.answer.length > 0 && (
            <div className="updown-vote">
              <div onClick={handleUpvote} className="upvote">
                <i style={{fontSize: "initial"}}className="fa-solid fa-arrow-up"></i>
                <span className="upvotes-text ">Upvote</span>
              </div>
              <div>
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
            )}

            {/* <i onClick={() => setToggle(!toggle)} className="comment fa-regular fa-comment"></i> */}
              <div>
        {sessionUser.id === question.user.id ? (
          <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteQuestionModal question={question} />}
          />
        ) : (
          ""
        )}
        {sessionUser.id === question.user.id ? (
          <OpenModalButton
            buttonText="Edit"
            modalComponent={<EditQuestionModal question={question} />}
          />
        ) : (
          ""
        )}
          </div>
      </div>
      </div>
    </div>
  );
}

export default Question;
