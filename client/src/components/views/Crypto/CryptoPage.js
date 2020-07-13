import React, { useEffect, useState } from 'react'
import {
    useParams
} from "react-router-dom";
import CryptoChart from './CryptoChart'
import axios from 'axios';
import { connect } from 'react-redux';
var moment =require('moment')

function CryptoPage (props) {
    let { id } = useParams();
    const [priceData, setPriceData] = useState({})
    const [vsCurrency, setVsCurrency] = useState('cad')

    useEffect(()=> {
        axios.get(`/api/crypto/price/${id}`)
            .then(response => {
                console.log('response', response.data.info.data)
                setPriceData(response.data.info.data)
            })
    }, [])
    
    return (
        <div className="app padded" style={{paddingBottom: '150px'}}>
            <h1 className="page-heading">Symbol: {id}</h1>
            <p>Cryptocurrency</p>
            <p style={{fontSize: '24px'}}>Price: ${priceData[`${id}`] && priceData[`${id}`][vsCurrency]}</p>
            <p>Last updated at: {priceData[`${id}`] && moment(priceData[`${id}`]['last_updated_at']).format('HH:mm:ss on dd MMMMM, YYYY')}</p>
            <CryptoChart cryptoId={id}/>
        </div>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(CryptoPage)
