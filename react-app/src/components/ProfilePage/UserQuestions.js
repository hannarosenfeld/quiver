import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AddAnswerModal from '../AddAnswerModal';
import EditQuestionModal from "../EditQuestionModal";
import DeleteQuestionModal from "../DeleteQuestionModal"

function UserQuestions({ question }) {
        
    return (
        <div className="user-question">
            <h4><NavLink to={`/questions/${question.id}`}>{question.title}</NavLink></h4>
            <div style={{fontSize: "13px", fontWeight: "bold", marginTop: "10px", color: "var(--qgrey"}}>{question?.answers?.length > 0 ? `${question.answers.length} answers` : "No answer yet"} </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{display: "flex", gap: "0.3em", alignItems: "baseline"}}>
                    <span><i class="fa-regular fa-pen-to-square"></i></span>
                    <OpenModalButton 
                        buttonText="Answer"
                        modalComponent={<AddAnswerModal question={question}/>}
                    ></OpenModalButton>
                </div>
                <div className="hover-red" style={{display: "flex", gap: "10px"}}>
                    <OpenModalButton 
                        buttonText="Edit"
                        modalComponent={<EditQuestionModal question={question}/>}
                    ></OpenModalButton>
                    <OpenModalButton 
                        buttonText="Delete"
                        modalComponent={<DeleteQuestionModal question={question} />}
                    ></OpenModalButton>
                </div>
            </div>
        </div>
    )
}

export default UserQuestions;