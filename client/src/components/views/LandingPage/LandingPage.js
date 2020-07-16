import React, { useEffect, useState } from 'react'
import { AiOutlineStock } from "react-icons/ai";
import logo from '../../../assets/logo512_dark_nobg.png'
import mountainBG from '../../../assets/mountain-bg2.jpg'
import {Button} from 'antd';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';


function LandingPage (props) {
    
    return (
        <>
        <div className="app landing-page-container" 
        >
            <img src={logo} alt='logo' style={{height: '140px', marginBottom: '16px'}} />
            <h1 style={{
                fontSize: '60px', 
                // backgroundColor: 'rgba(0,25,50,0.2)', 
                // color: 'white',
                color: '#1446a0ff',
                padding: '0px 40px',
                fontStyle: 'italic'
                // textShadow: '2px 5px 18px #000000'
            }}>Stock Sim 3000</h1>
            <div className="landing-button-container" style={{paddingBottom: '200px'}}> 
                <Link to={(props.user && props.user.userData && props.user.userData.isAuth) ? "/leaderboards" : "/login"}><Button className="landing-button">Leaderboards</Button></Link>
                <Link to={(props.user && props.user.userData && props.user.userData.isAuth) ? "/portfolio" : "/login"}><Button className="landing-button">Portfolio</Button></Link>
                <Link to="/browse-crypto"><Button className="landing-button">Explore</Button></Link>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(LandingPage)
