import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addNewQuestionThunk, getAllQuestionsThunk } from "../../store/question"
import "./AskQuestion.css"

function AskQuestion() {
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