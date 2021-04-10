export const userDataInitState = {
    id: '',
    avatar: '',
    username: '',
    sentFriendRequests: [],
    receivedFriendRequests: [],
    contacts: [],
};

function saveUserData(state = userDataInitState, action) {
    if (action.type === 'SAVE_USER_DATA') {
        return action.userData;
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
