const GET_USER = "user/GET_USER"
const CHANGE_PROFILE_PIC = "user/CHANGE_PROFILE_PIC";

const getUserAction = (user) => ({
    type: GET_USER,
    user
})

const changeProfilePicAction = (pictureUrl) => ({
    type: CHANGE_PROFILE_PIC,
    payload: pictureUrl,
})

export const getUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)
    if (res.ok) {
        const data = await res.json()
        await dispatch(getUserAction(data))
        return data
    } else {
        const err = await res.json()
        return err
    }
}

export const changeProfilePicThunk = (userId, file) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: file
    })

    if (res.ok) {
        const updatedProfilePic = await res.json()
        await dispatch(changeProfilePicAction(updatedProfilePic))
        return updatedProfilePic
    } else {
        const err = await res.json()
        return err
    }
}

const initialState = {
    users: {},
    userProfile: {
      userId: null,
      profilePicture: '',
    },
    currentUser: {}
  };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
        // Handle the GET_USER action to update the user profile in state
            return {
                ...state,
                users: {
                ...state.users,
                [action.user.userId]: action.user, // Assuming the user object contains userId and other profile data
                currentUser: action.user
            },
        };
        case CHANGE_PROFILE_PIC:
            return {
              ...state,
              userProfile: {
                ...state.userProfile,
                profilePicture: action.payload,
              },
            };
        default:
            return state;
    }
}

export default userReducer;