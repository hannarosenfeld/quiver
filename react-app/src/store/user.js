const CHANGE_PROFILE_PIC = "user/CHANGE_PROFILE_PIC";

const changeProfilePicAction = (pictureUrl) => ({
    type: CHANGE_PROFILE_PIC,
    payload: pictureUrl,
})

export const changeProfilePicThunk = (userId, file) => async (dispatch) => {
    console.log("🐬 in thunk")
    console.log("🐬 userId:", userId)
    console.log("🐬 file:", file)

    const res = await fetch(`/api/users/${userId}/`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
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
    userProfile: {
      userId: '',
      profilePicture: '',
    },
  };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
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