import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AddAnswerModal from '../AddAnswerModal';

function UserQuestion({ question }) {
    console.log(question)
    return (
        <div className="user-question">
            <h4><NavLink to={`/questions/${question.id}`}>{question.title}</NavLink></h4>
            <div style={{display: "flex", gap: "0.3em", alignItems: "baseline"}}>
                <span><i class="fa-regular fa-pen-to-square"></i></span>
                <OpenModalButton 
                    buttonText="Answer"
                    modalComponent={<AddAnswerModal question={question}/>}
                ></OpenModalButton>
            </div>
        </div>
    )
}

export default UserQuestion;