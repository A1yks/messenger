import history from '../history';

function getUserData(userId) {
    return async (dispatch) => {
        const request = await fetch(`/api/chat/getUser/${userId}`);
        const { success, userData } = await request.json();

        if (success) {
            dispatch({ type: 'SAVE_USER_DATA', userData });
        } else {
            document.cookie = 'authToken=; Max-Age=0';
            history.push('/auth/login');
        }
    };
}

export default getUserData;
