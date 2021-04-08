import history from '../history';
import { combineReducers } from 'redux';
import userData, { userDataInitState } from './saveUserData';
import searchResults, { searchResultsInitState } from './setContacts';

const appReducer = combineReducers({ userData, searchResults });

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        document.cookie = 'authToken=; Max-Age=0';
        state = { userData: userDataInitState, searchResults: searchResultsInitState };
        history.push('/auth/login');
    }

    return appReducer(state, action);
};

export default rootReducer;
