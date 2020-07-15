import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux';

function WatchlistPage (props) {
    
    return (
        <>
        <div className="app padded">
            <h1 className="page-heading">Watchlist</h1>
            <h2>Sorry, watchlist feature not available yet. <br/>
            
            </h2>
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    userData: state.user && state.user.userData
});

export default connect(mapStateToProps)(WatchlistPage)
