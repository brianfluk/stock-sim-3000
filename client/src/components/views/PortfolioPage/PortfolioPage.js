import React, { useEffect, useState } from 'react'
import { AiOutlineStock } from "react-icons/ai";

import { connect } from 'react-redux';

function PortfolioPage (props) {
    
    return (
        <>
        <div className="app">
            <h1 style={{ fontSize: '42px' }}>Portfolio</h1>
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(PortfolioPage)
