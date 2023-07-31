const GET_ALL_ANSWERS = "answer/GET_ALL_ANSWERS";
const GET_ONE_ANSWER = "answer/GET_ONE_ANSWER";
const ADD_NEW_ANSWER = "answer/ADD_NEW_ANSWER";
const UPDATE_ANSWER = "answer/UPDATE_ANSWER";
const DELETE_ANSWER = "answer/DELETE_ANSWER";
const UPVOTE_ANSWER = "answer/UPVOTE_ANSWER";
const DOWNVOTE_ANSWER = "answer/DOWNVOTE_ANSWER";

const getAllAnswersAction = (answers) => ({
  type: GET_ALL_ANSWERS,
  answers,
});

const getOneAnswerAction = (answer) => ({
  type: GET_ONE_ANSWER,
  answer,
});

const addNewAnswerAction = (answer) => ({
  type: ADD_NEW_ANSWER,
  answer,
});

const updateAnswerAction = (answer) => ({
  type: UPDATE_ANSWER,
  answer,
});

const deleteAnswerAction = (answerId) => ({
  type: DELETE_ANSWER,
  answerId,
});

const upvoteAnswerAction = (answer, isUpvoting) => {
  return {
    type: UPVOTE_ANSWER,
    payload: {
      answer,
      isUpvoting,
    },
  };
};


const downvoteAnswerAction = (answer, isDownvoting) => ({
  type: DOWNVOTE_ANSWER,
  answer,
  isDownvoting,
});

export const getOneAnswerThunk = (questionId, answerId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}/answers/${answerId}`);

    if (res.ok) {
      const data = await res.json();
      await dispatch(getOneAnswerAction(data));
      return data;
    } else {
      const err = await res.json();
      return err;
    }
  };

export const deleteAnswerThunk = (questionId, answerId) => async (dispatch) => {
  const res = await fetch(`/api/questions/${questionId}/answers/${answerId}/`, { method: "DELETE" });

  if (res.ok) {
    const successMessage = await res.json();
    dispatch(deleteAnswerAction(answerId));
    return successMessage;
  } else {
    const err = await res.json();
    return err;
  }
};

export const updateAnswerThunk = (answerInfo, answerId, questionId) => async (dispatch) => {
  const res = await fetch(`/api/questions/${questionId}/answers/${answerId}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answerInfo),
  });

  if (res.ok) {
    const updatedAnswer = await res.json();
    await dispatch(updateAnswerAction(updatedAnswer));
    return updatedAnswer;
  } else {
    const err = await res.json();
    return err;
  }
};

export const addNewAnswerThunk = (questionId, answer) => async (dispatch) => {
  const res = await fetch(`/api/questions/${questionId}/answers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answer),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(addNewAnswerAction(data));
    return data;
  } else {
    const err = await res.json();
    return err;
  }
};

export const getAllAnswersThunk = (questionId) => async (dispatch) => {
  const res = await fetch(`/api/questions/${questionId}/answers`);

  if (res.ok) {
    const data = await res.json();
    await dispatch(getAllAnswersAction(data));
    return data;
  } else {
    const err = await res.json();
    return err;
  }
};


export const upvoteAnswerThunk = (questionId, answerId, isUpvoting) => async (dispatch) => {
  const method = isUpvoting ? "PUT" : "DELETE";

  const options = {
    method,
  };

  if (method === "PUT") {
    options.headers = { "Content-Type": "application/json" };
  }

  const res = await fetch(`/api/questions/${questionId}/answers/${answerId}/upvotes/`, options);

  if (res.ok) {
    const updatedAnswer = await res.json();
    dispatch(upvoteAnswerAction(updatedAnswer, isUpvoting));
    return updatedAnswer;
  } else {
    const err = await res.json();
    return err;
  }
};

export const downvoteAnswerThunk = (questionId, answerId, isDownvoting) => async (dispatch) => {
  const method = isDownvoting ? "PUT" : "DELETE";

  const options = {
    method,
  };

  if (method === "PUT") {
    options.headers = { "Content-Type": "application/json" };
  }

  const res = await fetch(`/api/questions/${questionId}/answers/${answerId}/downvotes/`, options);

  if (res.ok) {
    const downvotedAnswer = await res.json();
    dispatch(downvoteAnswerAction(downvotedAnswer, isDownvoting));
    return downvotedAnswer;
  } else {
    const err = await res.json();
    return err;
  }
};

const initialState = {
  answers: [],
  currentAnswer: null

};

const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ANSWERS:
      return {
        ...state,
        answers: action.answers,
      };
    case GET_ONE_ANSWER:
      return {
        ...state,
        currentAnswer: {
          ...state.currentAnswer,
          answer: action.answer,
        },
      };
    case ADD_NEW_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.answer.id]: action.answer,
        },
      };
    case UPDATE_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.answer.id]: action.answer,
        },
      };
    case DELETE_ANSWER:
      const updatedAnswers = { ...state.answers };
      delete updatedAnswers[action.answerId];
      return {
        ...state,
        answers: updatedAnswers,
      };
    case UPVOTE_ANSWER:
      // Make sure currentAnswer is set before accessing its properties
      if (!state.currentAnswer) {
        return state;
      }

      return {
        ...state,
        currentAnswer: {
          ...state.currentAnswer,
          upvotes: action.isUpvoting
            ? [...state.currentAnswer.upvotes, { user_id: action.answer?.user?.id }]
            : state.currentAnswer.upvotes.filter((upvote) => upvote.user_id !== action.answer?.user?.id),
        },
      };
    case DOWNVOTE_ANSWER:
      // Make sure currentAnswer is set before accessing its properties
      if (!state.currentAnswer) {
        return state;
      }
    
      return {
        ...state,
        currentAnswer: {
          ...state.currentAnswer,
          downvotes: action.isDownvoting
            ? [...state.currentAnswer.downvotes, { user_id: action.answer?.user?.id }]
            : state.currentAnswer.downvotes.filter((downvote) => downvote.user_id !== action.answer?.user?.id),
        },
      };
      
    default:
      return state;
  }
};

export default answerReducer;
