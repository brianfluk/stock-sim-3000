import React  from 'react'
import { FaBitcoin } from "react-icons/fa";

import { connect } from 'react-redux';
import CryptoList from './CryptoList';
// import CryptoSuggestions from '.'


function BrowseCryptoPage (props) {
    return (
        <div className="app padded">
            <FaBitcoin style={{ fontSize: '50px', color: '#1446a0ff' }}/>
            <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>Browse Cryptocurrencies</h1>
            <CryptoList />
            {/* <CryptoSuggestions /> */}
        </div>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(BrowseCryptoPage)
