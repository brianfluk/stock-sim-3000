import axios from 'axios';
import {
    GET_WATCHLISTS,
    ADD_CRYPTO_WATCHLIST,
    REMOVE_CRYPTO_WATCHLIST
} from './types';
// import { USER_SERVER } from '../components/Config.js';

export function getWatchlistsByUser(userId){
    // const request = axios.post(`/api/portfolio/create`, {
    //     name: name,
    //     cash: cash
    // })
    //     .then(response => response.data)
    //     .catch(err => {
    //         console.log(err)
    //     })
    return {
        type: GET_WATCHLISTS,
        payload: request
    }
}

export function addCryptoToWatchlist(wid, cid) {
    return {
        type: ADD_CRYPTO_WATCHLIST,
        // payload: request
    }
}

export function removeCryptoFromWatchlist(wid, cid) {
    return {
        type: REMOVE_CRYPTO_WATCHLIST,
        // payload: request
    }
}
