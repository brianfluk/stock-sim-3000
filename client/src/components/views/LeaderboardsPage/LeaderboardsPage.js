import React, { useEffect, useState } from 'react'
import { GiLaurelCrown } from "react-icons/gi";

import { connect } from 'react-redux';

function LeaderboardsPage (props) {
    
    return (
        <div className="app padded">
            <GiLaurelCrown style={{fontSize: '4rem'}} color='#ffc53d'/>
            <h1 style={{ fontSize: '42px' }}>Leaderboards1</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards2</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards3</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboards</h1>
            <h1 style={{ fontSize: '42px' }}>Leaderboardsxxx</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(LeaderboardsPage)
