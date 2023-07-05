const GET_ALL_POSTS = "post/GET_ALL_POSTS"

const getAllPostsAction = (posts) => ({
    type: GET_ALL_POSTS,
    posts
})

export const getAllPostsThunk = () => async (dispatch) => {
    const res = await fetch("/api/posts/")

    if (res.ok) {
        const data = await res.json()
        await dispatch(getAllPostsAction(data))
        return data
    } else {
        const err = await res.json()
        return err
    }
}


const initialState = { allPosts: {}, post: { posts: [] }, currentPost: {}};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            const postState = {...state, allPosts: {...state.allPosts}}
            postState.post = action.posts
            return postState;
        default:
            return state;
    }
}

export default postReducer;