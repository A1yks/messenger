import history from '../history';
import { ipcRenderer } from 'electron';
import { combineReducers } from 'redux';
import userData, { userDataInitState } from './saveUserData';
import searchResults, { searchResultsInitState } from './setContacts';
import selectedChat, { selectedChatInitState } from './selectChat';
import keys, { keysInitState } from './keys';

const appReducer = combineReducers({ userData, searchResults, selectedChat, keys });

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        // document.cookie = 'authToken=; Max-Age=0';
        state = { userData: userDataInitState, searchResults: searchResultsInitState, selectedChat: selectedChatInitState, keys: keysInitState };
        ipcRenderer.send('clearCookies', { name: 'authToken' });
    }

    return appReducer(state, action);
};

ipcRenderer.on('logout', () => {
    history.push('/auth/login');
});

export default rootReducer;
