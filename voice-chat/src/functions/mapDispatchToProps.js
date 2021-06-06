import getUserData from './getUserData';
import search from './search';
import getKeys from './getKeys';

function mapDispatchToProps(dispatch) {
    return {
        getUserData: (id) => dispatch(getUserData(id)),
        searchUsers: (query) => dispatch(search(query)),
        getKeys: (publicRSAKey, privateRSAKey, cb) => dispatch(getKeys(publicRSAKey, privateRSAKey, cb)),
        setPublicRsaKey: (publicRSA) => dispatch({ type: 'SET_PUBLIC_RSA_KEY', publicRSA }),
        setPrivateRsaKey: (privateRSA) => dispatch({ type: 'SET_PRIVATE_RSA_KEY', privateRSA }),
        addFriendRequest: (friendId) => dispatch({ type: 'ADD_FRIEND_REQUEST', friendId }),
        removeFriendRequest: (friendId) => dispatch({ type: 'REMOVE_FRIEND_REQUEST', friendId }),
        rejectFriend: (friendId) => dispatch({ type: 'REJECT_FRIEND_REQUEST', friendId }),
        addContact: (contact) => dispatch({ type: 'ADD_CONTACT', contact }),
        removeContact: (friendId) => dispatch({ type: 'REMOVE_CONTACT', friendId }),
        logout: () => dispatch({ type: 'USER_LOGOUT' }),
        openChat: (friend) => dispatch({ type: 'OPEN_CHAT', friend }),
        selectChat: (selectedChat) => dispatch({ type: 'SELECT_CHAT', selectedChat }),
        closeChat: () => dispatch({ type: 'CLOSE_CHAT' }),
        saveFriendRequests: (users) => dispatch({ type: 'NEW_FRIEND_REQUEST', users }),
        setMessagesCount: (messagesCount) => dispatch({ type: 'LOAD_MESSAGES', messagesCount }),
        removeKey: (chatId) => dispatch({ type: 'REMOVE_KEY', chatId }),
    };
}

export { mapDispatchToProps };
