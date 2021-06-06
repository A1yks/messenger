export const keysInitState = {};

function saveKeys(state = keysInitState, action) {
    if (action.type === 'SET_AES_KEYS') {
        return action.keys;
    }

    if (action.type === 'REMOVE_KEY') {
        const copy = { ...state };
        delete copy[action.chatId];
        return copy;
    }

    return state;
}

export default saveKeys;
