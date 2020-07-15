import axios from 'axios';
import {
    CREATE_PORTFOLIO,
    GET_PORTFOLIO_BY_USER
} from './types';
// import { USER_SERVER } from '../components/Config.js';

export function createPortfolio(name, cash){
    const request = axios.post(`/api/portfolio/create`, {
        name: name,
        cash: cash
    })
        .then(response => response.data)
        .catch(err => {
            console.log(err)
        })
    return {
        type: CREATE_PORTFOLIO,
        payload: request
    }
}

export function getPortfolioByUser() {
    const request = axios.get(`/api/portfolio/get-portfolio-by-user`) // userID thru cookie
        .then(response => response.data)
        .catch(err => {
            console.log(err)
        })
    console.log('request',request)
    return {
        type: GET_PORTFOLIO_BY_USER,
        payload: request
    }
}