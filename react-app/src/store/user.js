const CHANGE_PROFILE_PIC = "user/CHANGE_PROFILE_PIC";

const changeProfilePicAction = (profilePic) => ({
    type: CHANGE_PROFILE_PIC,
    profilePic
})

export const changeProfilePicThunk = (userId, file) => async (dispatch) => {
    console.log("🐬 in thunk")
    console.log("🐬 userId:", userId)
    console.log("🐬 file:", file)

    const res = await fetch(`/api/users/${userId}/`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(file)
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

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default userReducer;