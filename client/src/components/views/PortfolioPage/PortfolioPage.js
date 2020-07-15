import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { createPortfolio } from '../../../_actions/portfolio_actions'
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Table } from 'antd';
import { format } from 'd3-format';

function PortfolioPage (props) {
    const dispatch = useDispatch();
    const [portfolio, setPortfolios] = useState([{
        name: '',
        coins: [],
        stocks: [],
        cash: 0,
        createDate: '2020-07-14T20:58:21.987Z',
    }])
    const [noPortfolio, setNoPortfolio] = useState(false)
    const [hasPortfolio, setHasPortfolio] = useState(false)

    function getPortfolios() {
        const request = axios.get(`/api/portfolio/get-portfolio-by-user`) // userID thru cookie
        .then(response => {
            console.log(response.data)
            setPortfolios(response.data)
            setHasPortfolio(true)
            setNoPortfolio(false)
        })
        .catch(err => {
            console.log(err)
            setNoPortfolio(true)
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
            <h2 style={{
                marginBottom: '40px'
            }}>Balances of {props.user.userData && props.user.userData.username}</h2>
            {noPortfolio && 
                <Form
                    labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
                    initialValues={{
                        portfolioName: 'portfolio',
                        cash: 50000
                    }}
                    onFinish={values => {
                        dispatch(createPortfolio(values.portfolioName, values.cash));
                        getPortfolios();
                    }}
                >
                    <Form.Item
                        label="Portfolio Name"
                        name="portfolioName"
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Starting cash"
                        name="cash"
                    >
                        <Select>
                            <Select.Option value="3000">$3000</Select.Option>
                            <Select.Option value="50000">$50,000</Select.Option>
                            <Select.Option value="100000">$100,000</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button  type="primary" htmlType="submit">
                            Create a portfolio
                        </Button>
                    </Form.Item>
                </Form>
            }
            {hasPortfolio &&
                <div style={{display:'flex', flexDirection:'column'}}>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <div style={{fontWeight: 'bold'}}> Portfolio name </div>
                        <div>{portfolio[0]['name']}</div>
                    </div>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <div style={{fontWeight: 'bold'}}> Cash </div>
                        <div>{portfolio[0]['cash']}</div>
                    </div>
                    <Table 
                        style={{marginTop: '40px'}}
                        dataSource={portfolio[0]['coins']} 
                        pagination={{position: ['none','bottomRight']}}
                        columns={[
                            {title: 'Coin ID', dataIndex: 'coinId', key: 'coinId'},
                            {title: 'Average', dataIndex: 'avg', key: 'avg'},
                            {title: 'Amount held', dataIndex: 'numHeld', key: 'numHeld'},
                            {
                                title: 'Cash invested', dataIndex: 'cashAmt', key: 'cashAmt',
                                align: 'right',
                                render: (text, record) => {
                                    return format('($,.2f')(text)
                                }
                            },
                        ]}
                    />
                </div>
            }

        </div>
        </>
    )
}

const mapStateToProps = state => ({
    // portfolio: state.portfolio,
    user: state.user
});

export default connect(mapStateToProps)(PortfolioPage)
