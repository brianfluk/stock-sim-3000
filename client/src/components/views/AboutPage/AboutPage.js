import React from 'react'
import { AiOutlineStock, AiFillGithub } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo512_dark_nobg.png'

import { connect } from 'react-redux';

function AboutPage () {
    
    return (
        <>
        <div className="app padded">
            <img src={logo} alt='logo' style={{height: '140px', marginBottom: '16px'}} />
            <h1 style={{ fontSize: '42px' }}>Why Stock Sim 3000?</h1>
            <p style={{
                fontSize: '18px', whiteSpace: 'pre-wrap', textAlign: 'center',
                marginBottom: '35px'
            }}>
                {`Practice and improve your investment skills and build a portfolio with zero risk.\n`}
            </p>
            <p>
                <FaBitcoin style={{ fontSize: '4rem', color: '#1446a0ff' }}/>
                <AiOutlineStock style={{ fontSize: '4rem', color: '#1446a0ff' }} />
            </p>
            <h2 style={{ fontSize: '36px', marginTop: '20px' }}>
                How to get started:
            </h2>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection:'row', fontSize:'18px'}}>
                    <p style={{marginRight: '10px', color: '#096dd9'}}> 1 </p>
                    <p> Create a free account <Link to='register'>(Sign up)</Link></p>
                </div>
                <div style={{display: 'flex', flexDirection:'row', fontSize:'18px'}}>
                    <p style={{marginRight: '10px', color: '#096dd9'}}> 2 </p>
                    <p> Browse investments and build a portfolio </p>
                </div>
                <div style={{display: 'flex', flexDirection:'row', fontSize:'18px'}}>
                    <p style={{marginRight: '10px', color: '#096dd9'}}> 3 </p>
                    <p> See how your money skills stacks up on our leaderboards and have fun! </p>
                </div>
                
            </div>
            <div style={{marginTop: '100px'}}>
                Created by brianfluk 
                <a href='https://github.com/brianfluk'>
                    <AiFillGithub style={{fontSize: '20px', marginBottom: '-3px', marginLeft: '5px'}} />
                </a> 
            </div>
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(AboutPage)
