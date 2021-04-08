import getUserData from './getUserData';
import search from './search';

function mapDispatchToProps(dispatch) {
    return {
        getUserData: (id) => dispatch(getUserData(id)),
        searchUsers: (query) => dispatch(search(query)),
        addFriendRequest: (friendId) => dispatch({ type: 'ADD_FRIEND_REQUEST', friendId }),
        removeFriendRequest: (friendId) => dispatch({ type: 'REMOVE_FRIEND_REQUEST', friendId }),
        addContact: (friendId) => dispatch({ type: 'ADD_CONTACT', friendId }),
        removeContact: (friendId) => dispatch({ type: 'REMOVE_CONTACT', friendId }),
        logout: () => dispatch({ type: 'USER_LOGOUT' }),
    };
}

export { mapDispatchToProps };
