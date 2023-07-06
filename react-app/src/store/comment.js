const ADD_COMMENT = "comment/ADD_COMMENT"

const addNewCommentAction = (comment) => ({
    type: ADD_COMMENT,
    comment
})

export const addNewCommentThunk = (postId, comment) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comments/`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json()
        await dispatch(addNewCommentAction(data))
        return data
    } else {
        const err = await res.json()
        console.log(err)
        return err        
    }
}

const initialState = { comments: {}, currentComment: {} };

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
                const createState = {...state, comments: {...state.comments}, currentcomment: {}}
                createState.currentcomment = action.comments
                return createState
        default:
            return state;
    }
}

export default commentReducer;