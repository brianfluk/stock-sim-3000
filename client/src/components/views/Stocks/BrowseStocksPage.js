import React, { useEffect, useState } from 'react'
import { AiOutlineStock } from "react-icons/ai";

import { connect } from 'react-redux';

function BrowseStocksPage (props) {
    
    return (
        <div className="app padded">
            <AiOutlineStock style={{fontSize: '50px', color: '#1446a0ff'}} />
            <h1 className="page-heading">Stocks</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(BrowseStocksPage)
