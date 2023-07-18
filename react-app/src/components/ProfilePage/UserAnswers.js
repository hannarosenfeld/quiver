import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function UserAnswers({ answer }) {
    console.log("🐀 answer", answer)
    return (
        <div className="user-answer">
            <h4><NavLink to={`/questions/${answer.question_id}`}>{answer.question_title}</NavLink></h4>
            <div style={{padding: "10px 0", fontSize: "14px"}}>{answer.answer}</div>
            {/* UP AND DOWN VOTE */}
            <div className="updown-vote">
                <div className="upvote"><i class="fa-solid fa-arrow-up"></i><span style={{marginLeft: "5px"}}>Upvote</span></div>
            <div><i class="fa-solid fa-arrow-down"></i></div>
        </div>
        </div>
    )
}

export default UserAnswers;