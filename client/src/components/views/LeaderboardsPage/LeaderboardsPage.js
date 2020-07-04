import React, { useEffect, useState } from 'react'
import { GiLaurelCrown } from "react-icons/gi";

import { connect } from 'react-redux';

function LeaderboardsPage (props) {
    
    return (
        <div className="app">
            <GiLaurelCrown style={{fontSize: '4rem'}}/>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(LeaderboardsPage)
