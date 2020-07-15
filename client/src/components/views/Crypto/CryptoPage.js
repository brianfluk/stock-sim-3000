import React, { useEffect, useState } from 'react'
import {
    useParams
} from "react-router-dom";
import {
    Button,
    Modal,
    Form,
    Select,
    Tooltip,
    Input,
    InputNumber,
    Alert
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import CryptoChart from './CryptoChart'
import axios from 'axios';
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
var moment =require('moment')

const { Option } = Select;

function CryptoPage (props) {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [vsCurrency, setVsCurrency] = useState('cad')
    const [modalVisible, setModalVisible] = useState(false)
    const [BUY, SELL] = ['Buy', 'Sell']
    const [transType, setTransType] = useState(BUY)
    const [coinId, setCoinId] = useState(id)
    const defaultPriceData = {}
    defaultPriceData[id] = {}
    defaultPriceData[id][vsCurrency] = 1
    const [priceData, setPriceData] = useState(defaultPriceData)
    const [warningMessage, setWarningMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [topWarning, setTopWarning] = useState('No price data available for this cryptocurrency.')
    
    //portfolio 
    const defaultPortfolios = [{
        name: '',
        coins: [],
        stocks: [],
        cash: 0,
        createDate: '2020-07-14T20:58:21.987Z',
    }]
    defaultPortfolios[0].coins.push({
        coinId: coinId,
        numHeld: 0
    })
    const [portfolios, setPortfolios] = useState(defaultPortfolios)
    
    function getPortfolios() { // and for now, always use first portfolio when buying
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
        getPortfolios()
        axios.get(`/api/crypto/price/${id}`)
            .then(response => {
                console.log('response', response.data.info.data)
                if (response.data.info.data[id]) {
                    setTopWarning('')
                    setPriceData(response.data.info.data)
                }
                else {
                    setTopWarning('No price data available for this cryptocurrency.')
                }
            })
    }, [])
    

    function showModal() { 
        setSuccess(false)
        setModalVisible(true) 
    }
    
    function showBuyModal() {
        setTransType(BUY)
        showModal()
    }
    function showSellModal() {
        setTransType(SELL)
        showModal()
    }
    function handleCancel() {
        setModalVisible(false)
    }
    function handleOk() {
        setModalVisible(false)
    }
    function onFinishBuy(values) {
        setSuccess(false)
        const buyCash = values.coinAmt * priceData[coinId][vsCurrency]
        if (buyCash > portfolios[0].cash) {
            setWarningMessage("Insufficient cash to purchase")
            return
        }
        axios.post(`/api/portfolio/buy-crypto`, {
            portfolioId: portfolios[0]['_id'],
            cashAmt: buyCash,
            coinId: values.coinId,
            vs_currency: values.vs_currency
        }).then(response => {
            if (response.status == 200) {
                setSuccess(true)
                getPortfolios() // get updated portfolio data
            } else {
                setWarningMessage(JSON.stringify(response.data.info))
            }
        }).catch(err=> {
            setWarningMessage(JSON.stringify(err))
        })
    }

    function onFinishSell(values) {
        setSuccess(false)
        const coinAmt = Number(values.coinAmt);
        if (coinAmt > portfolios[0].coins.filter(obj=>obj.coinId==coinId)[0].numHeld) {
            setWarningMessage("Insufficient held cryptocurrency to sell")
            return
        }
        axios.post('/api/portfolio/sell-crypto', {
            portfolioId: portfolios[0]['_id'],
            coinAmt: coinAmt,
            coinId: values.coinId,
            vs_currency: values.vs_currency
        }).then(response => {
            if (response.status == 200) {
                setSuccess(true)
                getPortfolios()
            } else {
                setWarningMessage(JSON.stringify(response.data.info))
            }
        }).catch(err=> {
            setWarningMessage(JSON.stringify(err))
        })
    }

    function handleCoinChange(coinAmt) {
        if (coinAmt && !isNaN(coinAmt)){
            const availCash = portfolios[0].cash
            console.log(coinAmt)
            const buyCash = coinAmt * priceData[coinId][vsCurrency]
            console.log('buycash', buyCash)
        }
    }

    return (
        <div className="app padded" style={{paddingBottom: '150px'}}>
            <h1 className="page-heading" style={{marginBottom: 0}}> {id}</h1>
            <p>Cryptocurrency</p>
            {topWarning && 
            <Alert 
                type="warning"
                message={topWarning}
            />
            }
            <p style={{fontSize: '24px'}}>Price: ${priceData[`${id}`] && priceData[`${id}`][vsCurrency]}</p>
            <p>Last updated at: {priceData[`${id}`] && moment(priceData[`${id}`]['last_updated_at']).format('HH:mm:ss on MMMM DD, YYYY')}</p>
            
            {(!topWarning) && <div style={{display:'flex'}}>
                <Button type="primary" style={{marginRight: '30px'}} onClick={showBuyModal}>Buy</Button>
                <Button type="danger" onClick={showSellModal}>Sell</Button>
            </div>}
            <CryptoChart cryptoId={id}/>
            <Modal
                title={`${transType} Cryptocurrency`}
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                // okText="Cancel"
                footer={null}
            >
                {(transType==BUY) && 
                    <Form 
                        onFinish={onFinishBuy} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
                        initialValues={{
                            "coinId": coinId,
                            "vs_currency": 'cad'
                        }}
                    >
                        <Form.Item 
                            name="coinId"
                            label="Cryptocurrency ID"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label="Cash currency">
                            <Form.Item
                                name='vs_currency'
                                noStyle
                                rules={[{ required: true, message: 'Currency is required' }]}
                            >
                                <Select placeholder="Select currency">
                                    <Option value="cad">cad</Option>
                                    <Option value="usd">usd</Option>
                                </Select>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item 
                            label={
                                <span>
                                    Coin amount&nbsp;
                                    <Tooltip title="Quantity of cryptocurrency to buy.">
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </span>
                            } 
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="coinAmt"
                                rules={[{ required: true }]}
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            >
                                {/* <InputNumber min={0} onChange={handleCoinChange}/> */}
                                <InputNumber min={0}/>
                                 {/* TODO: for now, always use first portfolio  */}
                            </Form.Item>
                        </Form.Item>
                        <div style={{textAlign: "center", marginBottom: '24px'}}>
                            {`You can afford ${portfolios[0]['cash'] / priceData[coinId][vsCurrency]} with $${portfolios[0]['cash']}`}
                        </div>
                        {warningMessage &&
                            <Alert 
                                message={warningMessage}
                                type="error"
                                closable
                                showIcon
                            />
                        }
                        {success && 
                            <Alert 
                                message="Exchange successful"
                                type="success"
                                closable
                                showIcon
                            />
                        }
                        <Form.Item label=" " colon={false} style={{marginTop: '10px'}}>
                            <Button type="primary" htmlType="submit" style={{marginRight: '20px'}}>
                                {transType}
                            </Button>
                            <Button onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                }
                {(transType==SELL) && 
                <Form 
                    onFinish={onFinishSell} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
                    initialValues={{
                        "coinId": coinId,
                        "vs_currency": 'cad'
                    }}
                >
                    <Form.Item 
                        name="coinId"
                        label="Cryptocurrency ID"
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Cash currency">
                        <Form.Item
                            name='vs_currency'
                            noStyle
                            rules={[{ required: true, message: 'Currency is required' }]}
                        >
                            <Select placeholder="Select currency">
                                <Option value="cad">cad</Option>
                                <Option value="usd">usd</Option>
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item 
                        label={
                            <span>
                                Coin amount&nbsp;
                                <Tooltip title="Quantity of cryptocurrency to sell.">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>
                        } 
                        style={{ marginBottom: 0 }}
                    >
                        <Form.Item
                            name="coinAmt"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <InputNumber min={0}/>
                            {/* TODO: for now, always use first portfolio  */}
                        </Form.Item>
                    </Form.Item>
                    <div style={{textAlign: "center", marginBottom: '24px'}}>
                        {`You own ${portfolios[0].coins.filter(obj=>obj.coinId==coinId)[0].numHeld}`}
                    </div>
                    {warningMessage &&
                        <Alert 
                            message={warningMessage}
                            type="error"
                            closable
                            showIcon
                        />
                    }
                    {success && 
                        <Alert 
                            message="Exchange successful"
                            type="success"
                            closable
                            showIcon
                        />
                    }
                    <Form.Item label=" " colon={false} style={{marginTop: '10px'}}>
                        <Button type="primary" htmlType="submit" style={{marginRight: '20px'}}>
                            {transType}
                        </Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
                }
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(CryptoPage)
