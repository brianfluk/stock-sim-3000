import React, { useEffect, useState } from 'react'
import { AiOutlineStock } from "react-icons/ai";

import { connect } from 'react-redux';

function PreferencesPage (props) {
    
    return (
        <>
        <div className="app padded">
            <h1 className="page-heading">Preferences</h1>
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(PreferencesPage)
