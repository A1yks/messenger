import history from '../history';

function getUserData(userId) {
    return async (dispatch) => {
        const request = await fetch(`/api/chat/getUser/${userId}`);
        const { success, userData } = await request.json();

        if (success) {
            const arr = [];
            userData.receivedFriendRequests.forEach((id) => {
                arr.push(
                    fetch(`/api/chat/getUser/${id}`)
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
