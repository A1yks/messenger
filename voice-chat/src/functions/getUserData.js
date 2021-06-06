import history from '../history';

function getUserData(userId) {
    return async (dispatch) => {
        const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/getUser/${userId}`, { credentials: 'include' });
        const { success, userData } = await request.json();

        if (success) {
            const arr = [];
            userData.receivedFriendRequests.forEach((id) => {
                arr.push(
                    fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/getUser/${id}`, { credentials: 'include' })
                        .then((res) => res.json())
                        .then((json) => ({ ...json.userData }))
                );
            });
            Promise.all(arr).then((users) => {
                userData.receivedFriendRequests = users;
                dispatch({ type: 'SAVE_USER_DATA', userData });
            });
        } else {
            document.cookie = 'authToken=; Max-Age=0';
            history.push('/auth/login');
        }
    };
}

export default getUserData;
