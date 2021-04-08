import { combineReducers } from 'redux';
import userData from './saveUserData';
import contacts from './setContacts';

export default combineReducers({ userData, contacts });
