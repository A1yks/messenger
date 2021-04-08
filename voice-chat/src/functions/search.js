function search(searchQuery) {
    return async (dispatch) => {
        const request = await fetch(`/api/chat/search/${searchQuery}`);
        const { users } = await request.json();
        dispatch({ type: 'SET_CONTACTS', users });
    };
}

export default search;
