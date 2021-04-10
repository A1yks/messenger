export const selectedChatInitState = {};

function selectChat(state = selectedChatInitState, action) {
    if (action.type === 'SELECT_CHAT') {
        return { ...state, ...action.selectedChat };
    }

    if (action.type === 'OPEN_CHAT') {
        return { ...state, friend: action.friend };
    }

    if (action.type === 'CLOSE_CHAT') {
        return selectedChatInitState;
    }

    return state;
}

export default selectChat;
