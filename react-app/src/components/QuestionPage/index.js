import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import { addNewAnswerThunk,  getAllAnswersThunk  } from '../../store/answer';
import OpenModalButton from "../OpenModalButton";
import AddAnswerModal from '../AddAnswerModal';
import EditAnswerModal from '../EditAnswerModal';
import DeleteAnswerModal from '../DeleteAnswerModal';

function QuestionPage() {
    const dispatch = useDispatch();
    let id = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const questionsObj = useSelector(state => state.question.question.questions)
    const questions = Object.values(questionsObj)
    const answers = useSelector(state => state.answer.answers)
    const [showMenu, setShowMenu] = useState(false);    
    let currentQ;

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    useEffect(() => {
        const t = dispatch(getAllAnswersThunk(+id.questionId))
    }, [dispatch])

    if (!questions) return null

    for (let question of questions) {
        if (question.id === +id.questionId) {
            currentQ = question
        } 
    }

    if (currentQ) {
        return (
            <div style={{
                width: "656px", 
                margin: "0 auto",
                }}>
                <div style={{
                    margin: "0 auto",
                    border: "1px solid var(--qborder)",
                    padding: "0.5em",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5em"
                }}>
                    <p style={{fontWeight: "600"}}>{currentQ.title}</p>
                    <div style={{display: "flex", gap: "0.3em", alignItems: "baseline"}}>
                        <span><i class="fa-regular fa-pen-to-square"></i></span>
                        <OpenModalButton 
                            buttonText="Answer"
                            modalComponent={<AddAnswerModal question={currentQ}/>}
                        ></OpenModalButton>
                    </div>
                </div>

                <div>
                    <ul style={{display: "flex", flexDirection: "column-reverse"}}>
                        {currentQ.answer.map(a => (
                            <li key={a.id} style={{
                                marginTop: "1em",
                                border: "1px solid var(--qborder)",
                                padding: "0.5em"
                            }}>
                                <div style={{display: "flex", gap:"0.5em"}}>
                                    <div className="profile-pic-user-account-link"
                                        style={{
                                            backgroundImage: `url(${a.user.profile_pic})`, 
                                            backgroundSize: "40px", 
                                            backgroundPosition: "center"
                                        }}>
                                    </div>
                                    <div style={{fontSize: "13px", display: "flex", flexDirection: "column"}}>
                                        <span style={{fontWeight: "600"}}>{a.user.username}</span>
                                        <span>{a.created_at.split(" ").slice(0, 4).join(" ")}</span>
                                    </div>
                                </div>
                                <div style={{marginTop: "0.5em",fontSize: "0.9em", whiteSpace: "pre-wrap"}}>{a.answer}</div>
                                {a.user.id === sessionUser.id && (
                                    <div style={{display: "flex", gap: "0.5em",float: "right", marginRight: "1em"}}>
                                        <OpenModalButton 
                                            buttonText="Edit"
                                            modalComponent={<EditAnswerModal answerToEdit={a} question={currentQ}/>}
                                        ></OpenModalButton>
                                        <OpenModalButton 
                                            buttonText="Delete"
                                            modalComponent={<DeleteAnswerModal answerId={a.id} questionId={currentQ.id}/>}
                                        ></OpenModalButton>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>   
                </div>
            </div>
        )
    } else {
        return(
            <div>Not found</div>
        )
    }
}

export default QuestionPage;