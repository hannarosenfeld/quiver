const GET_ALL_ANSWERS = "answers/GET_ALL_ANSWERS"
const ADD_NEW_ANSWER = "question/ADD_NEW_ANSWER"

const getAllAnswersAction = (answers) => ({
    type: GET_ALL_ANSWERS,
    answers
})

const addNewAnswerAction = (answer) => ({
    type: ADD_NEW_ANSWER,
    answer
})

export const addNewAnswerThunk = (questionId, answer) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}/answers`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(answer)
    })

    if (res.ok) {
        const data = await res.json()
        console.log("🏐 data",data)
        await dispatch(addNewAnswerAction(data))
    } else {
        const err = await res.json()
        return err        
    }
}


export const getAllAnswersThunk = (questionId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}/answers`)

    if (res.ok) {
        const data = await res.json()
        await dispatch(getAllAnswersAction(data))
        return data
    } else {
        const err = await res.json()
        return err
    }
}

const initialState = { answers: {} };

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ANSWERS:
            const answerState = {...state, answers: {}}
            answerState.answers = action.answers
            return answerState;
        case ADD_NEW_ANSWER:
                const createState = {...state, answers: {...state.answers}}
                createState.currentAnswer = action.answer
                return createState
        default:
            return state;
    }
}

export default answerReducer;