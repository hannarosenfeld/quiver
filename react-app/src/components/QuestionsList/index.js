import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import Question from "../Question"

import "./QuestionsList.css"

function QuestionsList() {
    const questionsObj = useSelector(state => state.question.question.questions)
    const questions = Object.values(questionsObj)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    return (
        <div className="wrapper">
                <div className="homepage-wrapper">
                    <div className="question-list-wrapper">
                        <ul>
                            {questions.map(question => (
                                <li key={question.id}>
                                    <Question question={question} />
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>
        </div>
    )
}

export default QuestionsList;