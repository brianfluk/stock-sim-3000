import React, { useEffect, useState } from 'react'
import { GiLaurelCrown } from "react-icons/gi";
import { Table } from 'antd';

import { connect } from 'react-redux';

// for mockup
function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}
function generateName(){
    var name1 = ["investor","the","bright","adorable","adventurous","academic","coolio","acclaimed","electric","main","powerful","acidic","cryptic","magestic","actual","adept","whopping","rocky"];
    var name2 = ["people","history","way","art","world","information","map","family","government","health","system","computer"];
    var name = capFirst(name1[getRandomInt(1, name1.length)]) + '_' + capFirst(name2[getRandomInt(1, name2.length)]);
    return name;
}

function LeaderboardsPage (props) {
    const columns = [
        {title: 'Rank', dataIndex: 'rank'},
        {title: 'Name', dataIndex: 'name'},
        {title: 'Total Quarterly Earnings', dataIndex: 'score'},
    ]
    const data = [
        {key:1, rank:1, name:'topPlayer1',score:'$20294'},
        {key:2,rank:2,name:'hard_worker3',score:'$19898'},
        {key:3,rank:3,name:'its me',score:'$19897'},
    ]
    for (let i =0; i<52; i++) {
        data.push({
            key: i+4,
            rank: i+4,
            name: generateName(),
            score: '$'+String(19000 - i*73)
        })
    }
    return (
        <div className="app padded">
            <GiLaurelCrown style={{fontSize: '4rem'}} color='#ffc53d'/>
            <h1 style={{ fontSize: '42px' }}>Leaderboards1</h1>
            <Table columns={columns} dataSource={data}></Table>
        </div>
    )
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(LeaderboardsPage)
