import { useState } from "react"
import { useDispatch } from "react-redux";
import { addNewQuestionThunk, getAllQuestionsThunk } from "../../store/question"
import "./AskQuestion.css"

function AskQuestion() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const questionDetails = {
            title
        }

        console.log("✍🏻 new question: ",questionDetails)
        console.log("👰🏼‍♀️ type of title in frontend ",typeof(questionDetails.title))

        const newQuestionDispatch = await dispatch(addNewQuestionThunk(questionDetails))
        console.log("👩🏻‍💻 dispatch of new question in component", newQuestionDispatch)

        // dispatch(getAllQuestionsThunk())
    }

    return (
        <div className="wrapper">
            <div className="homepage-wrapper">
                <div className="ask-question-wrapper">
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