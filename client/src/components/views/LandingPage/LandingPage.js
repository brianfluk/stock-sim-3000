import React, { useEffect, useState } from 'react'
import { AiOutlineStock } from "react-icons/ai";

import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { getCryptoList } from "../../../_actions/crypto_actions";
import CryptoList from './CryptoList';


function LandingPage (props) {
    const dispatch = useDispatch();
    let rendered = false;
    useEffect(function() {
        dispatch(getCryptoList()).then(response => {
            rendered = true
        })
    }, [rendered])
    
    return (
        <>
        <div className="app">
            <AiOutlineStock style={{ fontSize: '4rem' }} /><br />
            <span style={{ fontSize: '2rem' }}>Stocks Data</span>
            <CryptoList />
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(LandingPage)
