export async function sendFriendRequest(friendId, callback) {
    const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/addFriend`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            friendId,
        }),
        credentials: 'include',
    });
    const { success } = await request.json();

    if (success) callback();
}

export async function cancelFriendRequest(friendId, callback) {
    const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/cancelFriendRequest`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            friendId,
        }),
        credentials: 'include',
    });
    const { success } = await request.json();

    if (success) callback();
}

export async function acceptFriendRequest(friendId, callback) {
    const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/acceptFriend`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            friendId,
        }),
        credentials: 'include',
    });
    const { success, chatId } = await request.json();

    if (success) callback(chatId);
}

export async function removeFriend(friendId, callback) {
    const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/removeFriend`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            friendId,
        }),
        credentials: 'include',
    });
    const { success } = await request.json();

    if (success) callback();
}

export async function rejectFriendRequest(friendId, callback) {
    const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/rejectFriend`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            friendId,
        }),
        credentials: 'include',
    });
    const { success } = await request.json();

    if (success) callback();
}
