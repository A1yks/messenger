function sendFriendRequest(userId, friendId) {
    return async (dispatch) => {
        const request = await fetch('/api/chat/addFriend', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                friendId,
            }),
        });
        const { success } = await request.json();

        if (success) dispatch({ type: '' });
    };
}

export default sendFriendRequest;
