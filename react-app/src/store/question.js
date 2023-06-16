const GET_ALL_QUESTIONS = "question/GET_ALL_QUESTIONS"
const ADD_NEW_QUESTION = "question/ADD_NEW_QUESTION"
const UPDATE_QUESTION = "question/UPDATE_QUESTION"

const getAllQuestionsAction = (questions) => ({
    type: GET_ALL_QUESTIONS,
    questions
})

const addNewQuestionAction = (question) => ({
    type: ADD_NEW_QUESTION,
    question
})

const updatedQuestionAction = (question) => ({
    type: UPDATE_QUESTION,
    question
})

export const getAllQuestionsThunk = () => async (dispatch) => {
    const res = await fetch("/api/questions")
    console.log("In Questions Thunk")

    if (res.ok) {
        const data = await res.json()
        await dispatch(getAllQuestionsAction(data))
        return data
    } else {
        const err = await res.json()
        return err
    }
}

export const addNewQuestionThunk = (question) => async (dispatch) => {
        const res = await fetch("/api/questions/", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(question)
        })
        if (res.ok) {
            const newQuestion = await res.json()
            dispatch(addNewQuestionAction(newQuestion))
            return newQuestion
        } else {
            const err = await res.json()
            return err
        }
}

export const updateQuestionThunk = (questionInfo, questionId) => async (dispatch) => {
    const {title} = questionInfo

    const res = await fetch(`/api/questions/${questionId}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(questionInfo)
    })

    if (res.ok) {
        const updatedQuestion = await res.json()
        await dispatch(updatedQuestionAction(updatedQuestion))
        return updatedQuestion
    } else {
        const err = await res.json()
        return err
    }

}



const initialState = { allQuestions: {}, question: { questions: [] }, currentQuestion: {}};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            const questionState = {...state, allQuestions: {...state.allQuestions}}
            questionState.question = action.questions
            console.log("👀 questionState.question",action)
            return questionState;
            case ADD_NEW_QUESTION:
                const createState = {...state, allQuestions: {...state.allQuestions}, currentQuestion: {} }
                createState.currentQuestion = action.question
                return createState
        default:
            return state;
    }
}

export default questionReducer;