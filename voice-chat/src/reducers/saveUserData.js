export const userDataInitState = {
    id: '',
    avatar: '',
    username: '',
    sentFriendRequests: [],
    receivedFriendRequests: [],
    contacts: [],
    messageNotifications: [],
    friendNotifications: [],
};

function saveUserData(state = userDataInitState, action) {
    if (action.type === 'SAVE_USER_DATA') {
        const userData = { ...action.userData };
        userData.messageNotifications = userData.notifications.filter(({ type }) => type === 'NEW_MESSAGE');
        userData.friendNotifications = userData.notifications.filter(({ type }) => type === 'FRIEND_REQUEST');
        delete userData.notifications;
        return userData;
    }

    if (action.type === 'ADD_FRIEND_REQUEST') {
        return { ...state, sentFriendRequests: [...state.sentFriendRequests, action.friendId] };
    }

    if (action.type === 'REMOVE_FRIEND_REQUEST') {
        return { ...state, sentFriendRequests: state.sentFriendRequests.filter((id) => id !== action.friendId) };
    }

    if (action.type === 'ADD_CONTACT') {
        console.log(action.contact);
        return {
            ...state,
            sentFriendRequests: state.sentFriendRequests.filter((id) => id !== action.contact.friendId),
            contacts: [...state.contacts, { ...action.contact }],
            receivedFriendRequests: state.receivedFriendRequests.filter((id) => id !== action.contact.friendId),
        };
    }

    if (action.type === 'REMOVE_CONTACT') {
        return { ...state, contacts: state.contacts.filter(({ friendId: id }) => id !== action.friendId) };
    }

    return state;
}

export default saveUserData;
