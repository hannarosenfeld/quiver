const GET_ALL_ANSWERS = "answers/GET_ALL_ANSWERS"

const getAllAnswersAction = (answers) => ({
    type: GET_ALL_ANSWERS,
    answers
})

export const getAllAnswersThunk = (questionId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}/answers`)

    if (res.ok) {
        const data = await res.json()
        await dispatch(getAllAnswersAction(data))
        console.log("🏐 data",data)
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
            console.log("🏀 answerState", action.answers)
            answerState.answers = action.answers
            return answerState;
        default:
            return state;
    }
}

export default answerReducer;