import React, { useEffect, useState } from 'react'
import { AiOutlineStock } from "react-icons/ai";
import logo from '../../../assets/logo512_dark_nobg.png'

import { connect } from 'react-redux';
// import { useDispatch } from "react-redux";
// import { getCryptoList } from "../../../_actions/crypto_actions";


function LandingPage (props) {
    
    return (
        <>
        <div className="app">
            <img src={logo} alt='logo' style={{height: '140px', marginBottom: '16px'}} />
            <h1 style={{ fontSize: '42px' }}>Stock Sim 3000</h1>
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(LandingPage)
