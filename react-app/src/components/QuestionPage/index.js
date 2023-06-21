import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import { addNewAnswerThunk } from '../../store/answer';
import OpenModalButton from "../OpenModalButton";
import AddAnswerModal from '../AddAnswerModal';

function QuestionPage() {
    const dispatch = useDispatch();
    let id = useParams();
    const questionsObj = useSelector(state => state.question.question.questions)
    const questions = Object.values(questionsObj)
    const [showMenu, setShowMenu] = useState(false);    
    let currentQ;

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    if (!questions) return null

    for (let question of questions) {
        console.log("🥎",question)

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
                    <p>{currentQ.title}</p>
                    <div>
                        <OpenModalButton 
                            buttonText="Answer"
                            modalComponent={<AddAnswerModal question={currentQ}/>}
                        />
                    </div>
                </div>

                <div>
                    <ul>
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
                                    <div style={{fontSize: "0.8em", fontWeight: "600"}}>
                                        <span>{a.user.username}</span>
                                        <span>{a.created_at}</span>
                                    </div>
                                </div>
                                <div style={{marginTop: "0.5em",fontSize: "0.9em"}}>{a.answer}</div>
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