const GET_ALL_POSTS = "post/GET_ALL_POSTS";
const DELETE_POST = "post/DELETE_POST";
const ADD_NEW_POST = "post/ADD_NEW_POST";
const UPVOTE_POST = "post/UPVOTE_POST";

const upvotePostAction = (post, isUpvoting) => ({
  type: UPVOTE_POST,
  post,
  isUpvoting,
});

const getAllPostsAction = (posts) => ({
  type: GET_ALL_POSTS,
  posts, // Return the array of posts directly without wrapping in an object
});

const deletePostAction = (postId) => ({
  type: DELETE_POST,
  postId,
});

const addNewPostAction = (post) => ({
  type: ADD_NEW_POST,
  post,
});

export const upvotePostThunk = (postId, isUpvoting) => async (dispatch) => {
  const method = isUpvoting ? "PUT" : "DELETE";

  const options = {
    method,
  };

  // Remove the "Content-Type" header for the DELETE request
  if (method === "PUT") {
    options.headers = { "Content-Type": "application/json" };
  }

  const res = await fetch(`/api/posts/${postId}/upvotes/`, options);

  if (res.ok) {
    const updatedPost = await res.json();
    dispatch(upvotePostAction(updatedPost, isUpvoting));
    return updatedPost;
  } else {
    const err = await res.json();
    return err;
  }
};

export const addNewPostThunk = (post) => async (dispatch) => {
  const res = await fetch("/api/posts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (res.ok) {
    const newPost = await res.json();
    dispatch(addNewPostAction(newPost));
    return newPost;
  } else {
    const err = await res.json();
    return err;
  }
};

export const deletePostThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
  if (res.ok) {
    await res.json(); // Don't need to return anything here since we're just dispatching an action
    dispatch(deletePostAction(postId));
  } else {
    const err = await res.json();
    return err;
  }
};

export const getAllPostsThunk = () => async (dispatch) => {
  console.log("in thunk")
  const res = await fetch("/api/posts/");

  if (res.ok) {
    const data = await res.json();
    // Assuming your response data is in the correct format { posts: [ ... ] }
    await dispatch(getAllPostsAction(data.posts));
    return data;
  } else {
    const err = await res.json();
    return err;
  }
};

const initialState = {
  allPosts: [],
  currentPost: {
    upvotes: [],
    downvotes: [],
    posts: [], // Set the initial value of posts to an empty array
  },
  upvotedPosts: [],
  downvotedPosts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.posts,
      };
    case ADD_NEW_POST:
      return {
        ...state,
        allPosts: [...state.allPosts, action.post],
      };
    case UPVOTE_POST:
      return {
        ...state,
        allPosts: state.allPosts.map((post) => {
          if (post.id === action.post.id) {
            return {
              ...post,
              upvotes: action.isUpvoting
                ? [...post.upvotes, { user_id: action.post.user.id }]
                : post.upvotes.filter((upvote) => upvote.user_id !== action.post.user.id),
            };
          }
          return post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => post.id !== action.postId),
      };
    default:
      return state;
  }
};


export default postReducer;
