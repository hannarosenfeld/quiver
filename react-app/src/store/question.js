const GET_ALL_QUESTIONS = "question/GET_ALL_QUESTIONS"

const getAllQuestionsAction = (questions) => ({
    type: GET_ALL_QUESTIONS,
    questions
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

const initialState = { allQuestions: {}, question: { questions: [] } };

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            const questionState = {...state, allQuestions: {...state.allQuestions}}
            questionState.question = action.questions
            console.log("👀 questionState.question",action)
            return questionState;
        default:
            return state;
    }
}

export default questionReducer;