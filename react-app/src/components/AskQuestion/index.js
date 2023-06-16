import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addNewQuestionThunk, getAllQuestionsThunk } from "../../store/question"
import "./AskQuestion.css"

function AskQuestion({ user }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const questionDetails = {
            title
        }

        const newQuestionDispatch = await dispatch(addNewQuestionThunk(questionDetails))
        await dispatch(getAllQuestionsThunk())
        setTitle("")
    }

    console.log("$$$$$$$$$",user)

    return (
        <div className="wrapper">
            <div className="homepage-wrapper">
                <div className="ask-question-wrapper">
                    <div className="profile-pic"
                        style={{
                            backgroundImage: `url(${user.profile_pic})`, 
                            backgroundSize: "45px", 
                            backgroundPosition: "center"
                        }}>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Start your question with "What", "How", "Why", etc.'
                            required
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AskQuestion;