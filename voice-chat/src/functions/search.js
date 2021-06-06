function search(searchQuery) {
    return async (dispatch) => {
        const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/search/${searchQuery}`, { credentials: 'include' });
        const { users } = await request.json();
        dispatch({ type: 'SET_CONTACTS', users });
    };
}

export default search;
