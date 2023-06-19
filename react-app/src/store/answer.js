const GET_ALL_ANSWERS = "answers/GET_ALL_ANSWERS"

const getAllAnswersAction = (answers) => ({
    type: GET_ALL_ANSWERS,
    answers
})

export const getAllAnswersThunk = (questionTitle) => async (dispatch) => {
    console.log("🧝🏽 in answer thunk")

    const res = await fetch(`/api/questions/${questionTitle}/answers/`)

    if (res.ok) {
        const data = await res.json()
        await dispatch(getAllAnswersAction(data))
        return data
    } else {
        const err = await res.json()
        return err
    }
}

const initialState = { allAnswers: {}, answer: { answers: [] }, currentAnswer: {}};

const answerReducer = (state = initialState, action) => {
    console.log("🧝🏽‍♀️ in answer reducer")
    switch (action.type) {
        // case GET_ALL_ANSWERS:
        //     const answerState = {...state, allAnswers: {...state.allAnswers}}
        //     answerState.answer = action.answers
        //     console.log("👀 answerState.answer",action)
        //     return answerState;
            // case ADD_NEW_ANSWER:
            //     const createState = {...state, allanswers: {...state.allanswers}, currentanswer: {} }
            //     createState.currentanswer = action.answer
            //     return createState
        default:
            return state;
    }
}

export default answerReducer;