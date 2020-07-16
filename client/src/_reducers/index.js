import { combineReducers } from 'redux';
import user from './user_reducer';
import crypto from './crypto_reducer';
import portfolio from './portfolio_reducer';
import watchlist from './watchlist_reducer';

const rootReducer = combineReducers({
    user,
    crypto,
    portfolio,
    watchlist
});

export default rootReducer;