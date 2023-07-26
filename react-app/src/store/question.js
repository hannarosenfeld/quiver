const GET_ALL_QUESTIONS = "question/GET_ALL_QUESTIONS"
const ADD_NEW_QUESTION = "question/ADD_NEW_QUESTION"
const UPDATE_QUESTION = "question/UPDATE_QUESTION"
const DELETE_QUESTION = "question/DELETE_QUESTION"
const GET_ONE_QUESTION = "question/GET_ONE_QUESTION"

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

const deleteQuestionAction = questionId => ({
    type: DELETE_QUESTION,
    questionId
})

const getOneQuestionAction = question => ({
    type: GET_ONE_QUESTION,
    question
})

export const getOneQuestionThunk = (questionId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}`)

    if (res.ok) {
        const data = await res.json()
        await dispatch(getOneQuestionAction(data))
        return data
    } else {
        const err = await res.json()
        return err
    }
}


export const getAllQuestionsThunk = () => async (dispatch) => {
    const res = await fetch("/api/questions/")

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


// TODO: change Title to Id? This is giving me an error when I try to submit
export const updateQuestionThunk = (questionInfo, questionId) => async (dispatch) => {
    const { title } = questionInfo

    const res = await fetch(`/api/questions/${questionId}/`, {
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

export const deleteQuestionThunk = (questionId) => async dispatch => {
    const res = await fetch(`/api/questions/${questionId}`, {method: "DELETE"})
    if (res.ok) {
        const successMessage = await res.json();
        dispatch(deleteQuestionAction(questionId))
        return successMessage;
    } else {
        const err = await res.json();
        return err;
    }
}

const initialState = { allQuestions: {}, question: { questions: [] }, currentQuestion: {}};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            const questionState = {...state, allQuestions: {...state.allQuestions}}
            questionState.question = action.questions
            return questionState;
        case GET_ONE_QUESTION:
            const oneQuestionState = {...state, currentQuestion: {}, allQuestions: {...state.allQuestions}}
            oneQuestionState.question = action.currentQuestion
        case ADD_NEW_QUESTION:
            const createState = {...state, allQuestions: {...state.allQuestions}, currentQuestion: {} }
            createState.currentQuestion = action.question
            return createState
        default:
            return state;
    }
}

export default questionReducer;