import React, { useEffect, useState } from 'react'
import { AiOutlineStock } from "react-icons/ai";
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

function BrowseStocksPage (props) {
    
    return (
        <div className="app padded" style={{whiteSpace: 'pre-wrap'}}>
            <AiOutlineStock style={{fontSize: '50px', color: '#1446a0ff'}} />
            <h1 className="page-heading">Stocks</h1>
            <h2>
                Sorry, this feature not available yet. <br/>
                Please feel free to explore <Link to="/browse-crypto">cryptocurrencies</Link> however!
            </h2>
        </div>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(BrowseStocksPage)
