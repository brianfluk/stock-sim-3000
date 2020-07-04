import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux';

function PortfolioPage (props) {
    
    return (
        <>
        <div className="app">
            <h1 style={{ fontSize: '42px' }}>Portfolio</h1>
            <h2>{props.userData && props.userData.email}</h2>
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    userData: state.user && state.user.userData
});

export default connect(mapStateToProps)(PortfolioPage)
