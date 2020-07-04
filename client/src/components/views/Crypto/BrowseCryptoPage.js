import React  from 'react'
import { FaBitcoin } from "react-icons/fa";

import { connect } from 'react-redux';
import CryptoList from './CryptoList';


function BrowseCryptoPage (props) {
    return (
        <div className="app">
            <FaBitcoin style={{ fontSize: '4rem' }}/>
            <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>Browse Cryptocurrencies</h1>
            <CryptoList />
        </div>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(BrowseCryptoPage)
