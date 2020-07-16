import {
    GET_WATCHLISTS,
    ADD_CRYPTO_WATCHLIST,
    REMOVE_CRYPTO_WATCHLIST,
} from '../_actions/types';


export default function(state={}, action){
    switch(action.type){
        // case CREATE_PORTFOLIO:
        //     return {...state }
        // case GET_PORTFOLIO_BY_USER:
        //     return {...state, portfolios: action.payload }
        default:
            return state;
    }
}