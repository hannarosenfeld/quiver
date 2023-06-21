import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";

function QuestionPage() {
    const dispatch = useDispatch();
    let id = useParams();
    const questionsObj = useSelector(state => state.question.question.questions)
    const questions = Object.values(questionsObj)
    let currentQ;

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    if (!questions) return null

    for (let question of questions) {
        console.log("🥎",question)

        console.log("🏸 question.id", question.id, "id:", id)

        if (question.id === +id.questionId) {

            currentQ = question
            console.log("🪀 currentQ: ", currentQ)
        } 
    }

    console.log("🎱 questionsObj",questionsObj)


    if (currentQ) {
        return (
            <div style={{
                width: "800px", 
                margin: "0 auto",
                }}>
                <div style={{
                    margin: "0 auto",
                    border: "1px solid var(--qborder)",
                    padding: "0.5em"
                }}>
                    {currentQ.title}                    
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