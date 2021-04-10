import history from '../history';
import { combineReducers } from 'redux';
import userData, { userDataInitState } from './saveUserData';
import searchResults, { searchResultsInitState } from './setContacts';
import selectedChat, { selectedChatInitState } from './selectChat';

const appReducer = combineReducers({ userData, searchResults, selectedChat });

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        document.cookie = 'authToken=; Max-Age=0';
        state = { userData: userDataInitState, searchResults: searchResultsInitState, selectedChat: selectedChatInitState };
        history.push('/auth/login');
    }

    return appReducer(state, action);
};

export default rootReducer;
