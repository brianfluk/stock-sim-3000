import React, { useEffect, useState } from 'react'
import {
    useParams
} from "react-router-dom";

import { connect } from 'react-redux';

function CryptoPage (props) {
    let { id } = useParams();
    
    return (
        <>
        <div className="app">
    <h1 style={{ fontSize: '42px' }}>Crypto: {id}</h1>
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(CryptoPage)
