import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../../OpenModalButton";
import EditQuestionModal from "../../EditQuestionModal";
import DeleteQuestionModal from "../../DeleteQuestionModal";

import "./Question.css";

function Question({ question }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [isTruncated, setIsTruncated] = useState(true);
  const contentRef = useRef(null);

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
              <div className="upvote">
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
