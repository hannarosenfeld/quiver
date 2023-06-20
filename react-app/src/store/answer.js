const GET_ALL_ANSWERS = "answers/GET_ALL_ANSWERS"

const getAllAnswersAction = (answers) => ({
    type: GET_ALL_ANSWERS,
    answers
})

export const getAllAnswersThunk = (questionId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}/answers/`)

    console.log("👩🏻‍💻 in getAllAnswersThunk")

    if (res.ok) {
        console.log("👩🏻‍💻 in getAllAnswersThunk res.ok")
        const data = await res.json()
        await dispatch(getAllAnswersAction(data))
        console.log("😊 data",data)
        return data
    } else {
        const err = await res.json()
        return err
    }
}

const initialState = { allAnswers: {}, currentAnswer: {}};

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ANSWERS:
            const answerState = {...state, allAnswers: {...state.allAnswers}}
            answerState.answer = action.answers
            console.log("👀 answerState.answer",action)
            return answerState;
        default:
            return state;
    }
}

export default answerReducer;