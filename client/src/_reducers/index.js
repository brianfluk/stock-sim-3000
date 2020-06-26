import { combineReducers } from 'redux';
import user from './user_reducer';
import crypto from './crypto_reducer';

const rootReducer = combineReducers({
    user,
    crypto
});

export default rootReducer;