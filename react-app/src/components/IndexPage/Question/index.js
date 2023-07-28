import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { upvoteAnswerAction, upvoteAnswerThunk, downvoteAnswerThunk, getOneAnswerThunk } from "../../../store/answer";
import { getOneQuestionThunk } from "../../../store/question";
import { getAllQuestionsThunk } from "../../../store/question";

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

      if (upvoted) {
        // Remove upvote
        const updatedAnswer = await dispatch(upvoteAnswerThunk(question.id, answerId, !upvoted));

        // Update the upvoted state and numUpvotes based on the updatedAnswer received from the server
        if (updatedAnswer) {
          setUpvoted(!upvoted);
          dispatch(getAllQuestionsThunk())
          dispatch(getOneQuestionThunk(question.id))

        }
      } else if (downvoted && !upvoted) {
        const updatedUpvote = await await dispatch(upvoteAnswerThunk(question.id, answerId, !upvoted));
        const updatedDownvote = await dispatch(downvoteAnswerThunk(question.id, answerId, !upvoted));
        dispatch(getAllQuestionsThunk())
        dispatch(getOneQuestionThunk(question.id))
        setDownvoted(false)
        setUpvoted(true)
      } else {
        // Add upvote
        const updatedAnswer = await dispatch(upvoteAnswerThunk(question.id, answerId, !upvoted));

        // Update the upvoted state and numUpvotes based on the updatedAnswer received from the server
        if (updatedAnswer) {
          setUpvoted(!upvoted);
          dispatch(getAllQuestionsThunk())
          dispatch(getOneQuestionThunk(question.id))
        }
      }

      setUpvoted(!upvoted);
    } catch (error) {
      console.error("Error handling upvote: ", error);
    }
  };

  const handleDownvote = async () => {
    console.log("⛑️")
    try {
      const answerId = question.answers[0]?.id;

      if (downvoted) {
        // Remove downvote
        const downdatedAnswer = await dispatch(downvoteAnswerThunk(question.id, answerId, !downvoted));

        // downdate the downvoted state and numdownvotes based on the downdatedAnswer received from the server
        if (downdatedAnswer) {
          setDownvoted(!downvoted);
          dispatch(getAllQuestionsThunk())
          dispatch(getOneQuestionThunk(question.id))

        }
      } else if (!downvoted && upvoted) {
        const updatedUpvote = await await dispatch(upvoteAnswerThunk(question.id, answerId, !upvoted));
        const updatedDownvote = await dispatch(downvoteAnswerThunk(question.id, answerId, !upvoted));
        dispatch(getAllQuestionsThunk())
        dispatch(getOneQuestionThunk(question.id))
        setDownvoted(true)
        setUpvoted(false)
      } else {
        // Add downvote
        const updatedAnswer = await dispatch(downvoteAnswerThunk(question.id, answerId, !downvoted));

        // update the downvoted state and numdownvotes based on the updatedAnswer received from the server
        if (updatedAnswer) {
          setDownvoted(!downvoted);
          dispatch(getAllQuestionsThunk())
          dispatch(getOneQuestionThunk(question.id))
        }
      }

      setDownvoted(!downvoted);
    } catch (error) {
      console.error("Error handling downvote: ", error);
    }
  };  


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
                <i style={{fontSize: "initial"}} className="fa-solid fa-arrow-up"></i>
                <span className="upvotes-text ">Upvote</span>
                <span style={{margin: "0 -15px"}}>・</span>
                <span className="upvotes-length">{question.answers[0].upvotes.length}</span>
              </div>
              <div style={{cursor: "pointer"}} onClick={handleDownvote} className={downvoted ? "downvoted" : ""}>
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
