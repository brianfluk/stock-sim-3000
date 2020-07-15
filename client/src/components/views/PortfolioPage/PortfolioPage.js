import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { getPortfolioByUser, createPortfolio } from '../../../_actions/portfolio_actions'
import { connect } from 'react-redux';
import { Button } from 'antd';

function PortfolioPage (props) {
    const dispatch = useDispatch();
    const [portfolio, setPortfolios] = useState([{
        name: '',
        coins: [],
        stocks: [],
        cash: 0,
        createDate: '2020-07-14T20:58:21.987Z',
    }])

    function getPortfolios() {
        const request = axios.get(`/api/portfolio/get-portfolio-by-user`) // userID thru cookie
        .then(response => {
            console.log(response.data)
            setPortfolios(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(()=> {
        // dispatch(getPortfolioByUser)
        getPortfolios()
    }, [])


    return (
        <>
        <div className="app padded" style={{whiteSpace:'pre-line'}}>
            <h1 className="page-heading">Portfolio</h1>
            <h2>{props.user.userData && props.user.userData.email}</h2>
            {JSON.stringify(portfolio[0], null, 2)}
            {/* {JSON.stringify(props.portfolio)} */}
            <Button onClick={() => dispatch(createPortfolio('myportfolio', 60000))}>Create a portfolio</Button>
            {/* <Button onClick={() => dispatch(getPortfolioByUser)}>fetch portfolios</Button> */}

        </div>
        </>
    )
}

const mapStateToProps = state => ({
    // portfolio: state.portfolio,
    user: state.user
});

export default connect(mapStateToProps)(PortfolioPage)
