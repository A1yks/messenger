import getUserData from './getUserData';
import search from './search';

function mapDispatchToProps(dispatch) {
    return {
        getUserData: (id) => dispatch(getUserData(id)),
        searchUsers: (query) => dispatch(search(query)),
        addFriendRequest: (friendId) => dispatch({ type: 'ADD_FRIEND_REQUEST', friendId }),
        removeFriendRequest: (friendId) => dispatch({ type: 'REMOVE_FRIEND_REQUEST', friendId }),
        addContact: (contact) => dispatch({ type: 'ADD_CONTACT', contact }),
        removeContact: (friendId) => dispatch({ type: 'REMOVE_CONTACT', friendId }),
        logout: () => dispatch({ type: 'USER_LOGOUT' }),
        openChat: (friend) => dispatch({ type: 'OPEN_CHAT', friend }),
        selectChat: (selectedChat) => dispatch({ type: 'SELECT_CHAT', selectedChat }),
        closeChat: () => dispatch({ type: 'CLOSE_CHAT' }),
        saveFriendRequests: (users) => dispatch({ type: 'NEW_FRIEND_REQUEST', users }),
    };
}

export { mapDispatchToProps };
