import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function UserAnswers({ answer, user }) {
    console.log("🐀 answer date", answer.created_at)

    const answerDate = answer.created_at.split(' ').slice(0,4).join(' ');

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
            <h4><NavLink to={`/questions/${answer.question_id}`}>{answer.question_title}</NavLink></h4>
            <div style={{padding: "10px 0", fontSize: "14px"}}>{answer.answer}</div>
            {/* UP AND DOWN VOTE */}
            <div className="updown-vote" style={{height: "30px"}}>
                <div className="upvote"><i class="fa-solid fa-arrow-up"></i><span style={{marginLeft: "5px"}}>Upvote</span></div>
            <div><i class="fa-solid fa-arrow-down"></i></div>
        </div>
        </div>
    )
}

export default UserAnswers;