const initialState = {
    id: '',
    avatar: '',
    username: '',
};

function saveUserData(state = initialState, action) {
    if (action.type === 'SAVE_USER_DATA') {
        return action.userData;
    }

    return state;
}

export default saveUserData;
