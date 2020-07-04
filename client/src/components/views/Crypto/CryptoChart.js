import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/** Put on hold because bugs */
function CryptoChart() {

    return (
        <div>
            CHART
        </div>
    )
}
CryptoList.propTypes = {
}

const mapStateToProps = state => ({
    // cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(CryptoChart)