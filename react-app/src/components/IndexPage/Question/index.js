import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { upvoteAnswerAction, upvoteAnswerThunk, downvoteAnswerThunk, getOneAnswerThunk } from "../../../store/answer";
import { getOneQuestionThunk } from "../../../store/question";

import OpenModalButton from "../../OpenModalButton";
import EditQuestionModal from "../../EditQuestionModal";
import DeleteQuestionModal from "../../DeleteQuestionModal";

import "./Question.css";



function Question({ question }) {
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // TODO: debug this:
  // const answer = dispatch(getOneAnswerThunk(question.id, question.answer[0]?.id)); // this won't work yet

  const [isTruncated, setIsTruncated] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [upvoted, setUpvoted] = useState(question.answers[0]?.upvotes?.some((upvote) => upvote.user_id === sessionUser?.id))
  const [downvoted, setDownvoted] = useState(question.answers[0]?.downvotes?.some((downvote) => downvote.user_id === sessionUser?.id))
  const [numUpvotes, setNumUpvotes] = useState(question.answers[0]?.upvotes?.length);

  useEffect(() => {
    // Check if the contentRef is available
    if (contentRef.current) {
      const contentElement = contentRef.current;
      setIsTruncated(contentElement.scrollHeight > contentElement.clientHeight);
    }
  }, [contentRef]);

  useEffect(() => {
    // Update the numUpvotes state whenever upvoted changes
    dispatch(getOneQuestionThunk(question.id));
  }, [upvoted]);

  useEffect(() => {
    setNumUpvotes(question.answers[0]?.upvotes?.length);
  }, [question])

  console.log("🐳 question: ", question)
  console.log("🌵 question.answers: ", question.answers)

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
    try {
      const answerId = question.answers[0]?.id;

      if (!answerId) {
        console.log("No answers available to upvote.");
        return;
      }

      if (upvoted) {
        // Remove upvote
        const updatedAnswer = await dispatch(upvoteAnswerThunk(question.id, answerId, !upvoted));

        // Update the upvoted state and numUpvotes based on the updatedAnswer received from the server
        if (updatedAnswer) {
          setUpvoted(!upvoted);
          setNumUpvotes(updatedAnswer.upvotes.length);
        }
      } else {
        // Add upvote
        const updatedAnswer = await dispatch(upvoteAnswerThunk(question.id, answerId, !upvoted));

        // Update the upvoted state and numUpvotes based on the updatedAnswer received from the server
        if (updatedAnswer) {
          setUpvoted(!upvoted);
          setNumUpvotes(updatedAnswer.upvotes.length);
        }
      }

      setUpvoted(!upvoted);
    } catch (error) {
      console.error("Error handling upvote: ", error);
    }
  };

  // const handleUpvote = async () => {
  //   const hasUpvoted = question.answers[0]?.upvotes?.some((upvote) => upvote.user_id === sessionUser?.id);
  
  //   console.log("🐡 hasUpvotes", hasUpvoted);
    
  //   // Toggle upvoting/undo upvoting by clicking on Upvote
  //   if (hasUpvoted) {
  //     // Remove upvote (undo upvoting)
  //     const updatedAnswer = await dispatch(upvoteAnswerThunk(question.id, question.answers[0]?.id, false));
  //     console.log(updatedAnswer);
  //     await dispatch(getOneQuestionThunk(question.id))
  //     // await dispatch(getOneAnswerThunk(question.id, question.answer[0]?.id));
  //     setUpvoted(false);
  //   } else {
  //     // Add upvote
  //     // Add upvote
  //     const updatedAnswer = await dispatch(upvoteAnswerThunk(question.id, question.answers[0]?.id, true));
  //     console.log("🐖 updatedAnswer", updatedAnswer);

  //     // Get the current answer data from the Redux store and include it in the action dispatch
  //     const currentAnswer = getState().answer.currentAnswer;

  //     // Dispatch the action with the currentAnswer data
  //     await dispatch(upvoteAnswerAction(updatedAnswer, true, currentAnswer));

  //     // await dispatch(getOneAnswerThunk(question.id, question.answer[0]?.id));
  //     setUpvoted(true);
  //   }
  // };
  

  // const handleUpvote = async () => {
  //   const hasUpvoted = question.answers[0]?.upvotes?.some((upvote) => upvote.user_id === sessionUser?.id);

  //   console.log("🐡 hasUpvotes",hasUpvoted)
  //   // Toggle upvoting/undo upvoting by clicking on Upvote
  //   if (hasUpvoted) {
  //     // Remove upvote (undo upvoting)
  //     const updatedAnswer = await dispatch(upvoteAnswerThunk(question.id, question.answers[0]?.id, false));
  //     console.log(updatedAnswer)
  //     // await dispatch(getOneAnswerThunk(question.id, question.answer[0]?.id))
  //     setUpvoted(false)
  //   } 
  //   //else if (downvoted && !hasUpvoted) {
  //   //   const updatedUpvote = await dispatch(upvoteAnswerThunk(question.id, question.answer[0]?.id, true)); // add upvote
  //   //   // const updatedDownvote = await dispatch(downvoteAnswerThunk(answer.id, false)); // remove downvote
  //   //   // await dispatch(getAllPostsThunk())
  //   //   setDownvoted(false)
  //   //   setUpvoted(true)
  //   // } 
  //   else {
  //     // Add upvote
  //     const updatedAnswer = await dispatch(upvoteAnswerThunk(question.id, question.answers[0]?.id, true)); // Change the second argument to `true`
  //     console.log("🐖 updatedAnswer",updatedAnswer)

  //    // await dispatch(getOneAnswerThunk(question.id, question.answer[0]?.id))
  //     setUpvoted(true)
  //   }
  // };

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
      {question.answers?.length ? (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px"}}>
          <div
            className="profile-pic"
            style={{
              backgroundImage: `url(${question.answers[0].user.profile_pic})`,
              backgroundSize: "40px",
              backgroundPosition: "center",
            }}
          ></div>
          <div style={{ fontSize: "0.8em", display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>{question.answers[0].user.username}</span>
            {question.answers[0].created_at ? (
              <span>{question.answers[0]?.created_at.split(" ").slice(0, 4).join(" ")}</span>
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

      {question.answers?.length ? (
        <div
          className={`question-content ${isTruncated ? "truncated" : "expanded"}`}
          ref={contentRef}
        >
          {question.answers[0].answer}
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
            {question?.answers?.length > 0 && (
            <div className="updown-vote">
              <div onClick={handleUpvote} className={upvoted ? "upvoted" : ''}>
                <i style={{fontSize: "initial"}}className="fa-solid fa-arrow-up"></i>
                <span className="upvotes-text ">Upvote</span>
                <span style={{margin: "0 -15px"}}>・</span>
                <span className="upvotes-length">{numUpvotes}</span>
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
