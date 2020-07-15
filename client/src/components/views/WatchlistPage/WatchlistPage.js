import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, List} from 'antd';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { LineSeriesCanvas } from 'react-vis';

function WatchlistPage (props) {
    const [noWatchlists,setNoWatchlists] = useState(false)
    const [hasWatchlist, setHasWatchlist] = useState(false)
    const [watchlists, setWatchlists] = useState([{
        name: '',
        coins: [],
        stocks: []
    }])

    function getWatchlists() {
        axios.get('/api/watchlist/get-watchlist-by-user')
        .then(response => {
            console.log(response.data)
            if (response.data.length == 0) {
                // no watchlists
                setNoWatchlists(true)
            } else {
                setWatchlists(response.data)
                setHasWatchlist(true)
                setNoWatchlists(false)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    
    function createWatchlist(name) {
        axios.post('/api/watchlist/create', {name:name})
        .then(response => {
            console.log(response.data);
            getWatchlists()
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(()=> {
        getWatchlists()
    }, [])


    
    return (
        <>
        <div className="app padded" style={{whiteSpace: 'pre-wrap'}}>
            <h1 className="page-heading">Watchlist</h1>
            {noWatchlists && 
                <Form 
                    labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
                    initialValues={{ watchlistName: 'watchlist'}}
                    onFinish={(values) => createWatchlist(values.watchlistName)}
                >
                    <Form.Item 
                        name="watchlistName"
                        label="Watchlist name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Create watchlist</Button>
                    </Form.Item>
                </Form>
            }
            {hasWatchlist && 
                <div>
                    <h2 style={{textAlign:'center'}}>"{watchlists[0].name}"</h2>
                    {/* {JSON.stringify(watchlists, null, '\t')} */}
                    <List
                        header={<div style={{fontWeight: 'bold', textAlign:'center'}}>Cryptocurrencies</div>}
                        dataSource={watchlists[0].coins}
                        bordered
                        renderItem={item => (
                            <List.Item>
                                <Link to={`/crypto/${item}`}>{item}</Link>
                            </List.Item>
                        )}
                    />
                </div>
            }
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    userData: state.user && state.user.userData
});

export default connect(mapStateToProps)(WatchlistPage)
