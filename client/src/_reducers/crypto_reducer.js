import {
    GET_LIST_CRYPTO
} from '../_actions/types';


export default function(state={}, action){
    switch(action.type){
        case GET_LIST_CRYPTO:
            return {...state, cryptoList: action.payload }
        default:
            return state;
    }
}