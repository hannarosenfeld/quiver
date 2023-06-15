import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import "./QuestionsList.css"

function QuestionsList() {
    const questionsObj = useSelector(state => state?.question?.question?.questions)
    const questions = Object.values(questionsObj)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    console.log("object: ",questionsObj)
    console.log("array", questions)

    return (
        <div className="wrapper">
                <div className="question-list-wrapper">
                    <ul>
                        {questions.map(question => (
                            <li key={question.id}>{question.title}</li>
                        ))}
                    </ul>
            </div>
        </div>
    )
}

export default QuestionsList;