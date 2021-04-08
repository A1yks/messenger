export const searchResultsInitState = [];

function setContacts(state = searchResultsInitState, action) {
    if (action.type === 'SET_CONTACTS') {
        return action.users;
    }

    return state;
}

export default setContacts;
