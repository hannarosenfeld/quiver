import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import EditAnswerModal from "../EditAnswerModal";
import { getAllQuestionsThunk } from "../../store/question"
import { deleteAnswerThunk, getAllAnswersThunk, getOneAnswerThunk } from "../../store/answer"
import { upvoteAnswerThunk, downvoteAnswerThunk } from "../../store/answer";


function DeleteUserAnswerModal({ answerId, questionId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getAllAnswersThunk(questionId))
    }, [dispatch])

    const handleDelete = async () => {
        const deleteQuestionDispatch = await dispatch(deleteAnswerThunk(questionId, answerId))
        await dispatch(getAllQuestionsThunk())
        await dispatch(getAllAnswersThunk(questionId))
        closeModal()
    }

    return (
        <div className="delete-question">
            <h3>Delete answer</h3>
            <p>Are you sure you want to permanetly delete this answers?</p>
            <button type="submit" onClick={handleDelete}>Delete</button>
        </div>
    )
}

function UserAnswers({ answer, user }) {
    const dispatch = useDispatch();
    const answerDate = answer.created_at.split(' ').slice(0,4).join(' ');
    const a = useSelector((state) => state.answer)
    const antwort = useSelector(state => state.answer)
    const sessionUser = useSelector((state) => state.session.user);
    const [upvoted, setUpvoted] = useState(answer.upvotes?.some((upvote) => upvote.user_id === sessionUser?.id))
    const [downvoted, setDownvoted] = useState(answer.downvotes?.some((downvote) => downvote.user_id === sessionUser?.id))


    console.log("🍇 answer", answer)

    const handleUpvote = async () => {
        const hasUpvoted = answer.upvotes?.some((upvote) => upvote.user_id === sessionUser?.id);
    
        // Toggle upvoting/undo upvoting by clicking on Upvote
        if (hasUpvoted) {
          // Remove upvote (undo upvoting)
          const updatedAnswer = await dispatch(upvoteAnswerThunk(answer.id, false)); // Change the second argument to `false`
          await dispatch(getAllAnswersThunk())
          setUpvoted(false)
        } else if (downvoted && !hasUpvoted) {
          const updatedUpvote = await dispatch(upvoteAnswerThunk(answer.id, true)); // add upvote
          const updatedDownvote = await dispatch(downvoteAnswerThunk(answer.id, false)); // remove downvote
          await dispatch(getAllAnswersThunk())
          setDownvoted(false)
          setUpvoted(true)
        } else {
          // Add upvote
          const updatedAnswer = await dispatch(upvoteAnswerThunk(answer.id, true)); // Change the second argument to `true`
          await dispatch(getAllAnswersThunk())
          setUpvoted(true)
        }
      };
    
      const handleDownvote = async () => {
        const hasDownvoted = answer.downvotes?.some((downvote) => downvote.user_id === sessionUser?.id);
    
        // Toggle downvoting/undo downvoting by clicking on downvote
        if (hasDownvoted) {
          // Remove downvote (undo downvoting)
          const updatedAnswer= await dispatch(downvoteAnswerThunk(answer.id, false)); // Change the second argument to `false`
          await dispatch(getAllAnswersThunk())
          setDownvoted(false)
        } else if (upvoted && !hasDownvoted) {
          const updatedUpvote = await dispatch(upvoteAnswerThunk(answer.id, false)); // undo upvote
          const updatedDownvote = await dispatch(downvoteAnswerThunk(answer.id, true)); // add downvote
          await dispatch(getAllAnswersThunk())
          setDownvoted(true)
          setUpvoted(false)
        } else {
          // Add downvote
          const updatedAnswer= await dispatch(downvoteAnswerThunk(answer.id, true)); // Change the second argument to `true`
          await dispatch(getAllAnswersThunk())
          setDownvoted(true)
        }
      };

    return (
        <div className="user-answer">
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
                    <span>{answerDate}</span>
                </div>
            </div>
            <h4><NavLink to={`/questions/${answer.question_id}`}>{answer.question?.title}</NavLink></h4>
            <div style={{padding: "10px 0", fontSize: "14px"}}>{answer.answer}</div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                { answer.user?.id !== sessionUser.id && (
                <div className="updown-vote">
                    <div onClick={handleUpvote} className={upvoted ? "upvoted" : ""} style={{cursor: "pointer"}}>
                        <i class="fa-solid fa-arrow-up"></i>
                        <span style={{marginLeft: "5px", fontSize: "12px"}}>Upvote</span>
                        <span>・</span>
                        <span className="upvotes-length">{answer.upvotes?.length}</span>
                    </div>
                    <div 
                        onClick={handleDownvote} className={downvoted ? "downvoted" : ""}
                        style={{cursor: "pointer"}}
                    >
                        <i class="fa-solid fa-arrow-down"></i>
                    </div>
                </div>
                )}
                <div style={{display: "flex", gap: "10px"}}>
                    <OpenModalButton 
                        buttonText="Edit"
                        modalComponent={<EditAnswerModal answerToEdit={answer} question={answer.question_id}/>}
                    ></OpenModalButton>
                    <OpenModalButton 
                        buttonText="Delete"
                        modalComponent={<DeleteUserAnswerModal answerId={answer.id} questionId={answer.question_id}/>}
                    ></OpenModalButton>
                </div>
            </div>
        </div>
    )
}

export default UserAnswers;