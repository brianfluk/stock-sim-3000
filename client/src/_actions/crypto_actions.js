import axios from 'axios';
import {
    GET_LIST_CRYPTO
} from './types';
// import { USER_SERVER } from '../components/Config.js';

export function getCryptoList(){
    const request = axios.get(`/api/crypto/list`)
        .then(response => response.data);
    return {
        type: GET_LIST_CRYPTO,
        payload: request
    }
}
