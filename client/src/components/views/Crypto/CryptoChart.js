import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { format } from 'd3-format';
import '../../../../node_modules/react-vis/dist/style.css';
import {
    XYPlot, 
    FlexibleXYPlot, 
    LineSeries, 
    LineSeriesCanvas,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    Crosshair,
} from 'react-vis';

var moment =require('moment')
function CryptoChart(props) {
    const [chartData, setChartData] = useState([])
    const [hoverVals, setHoverVals] = useState([
        [{'x':0, 'y':0}],
        [{'x':0, 'y':0}],
        [{'x':0, 'y':0}]
    ])
    const [crosshairVals, setCrosshairVals] = useState([])

    useEffect(() => {
        axios.get(`/api/crypto/chart/${props.cryptoId}`)
            .then(response => {
                setChartData([
                    response.data.info.data.prices,
                    response.data.info.data.market_caps,
                    response.data.info.data.total_volumes,
                ])
            })
    }, [])

    // crosshair functions
    const _onMouseLeave = () => {
        setCrosshairVals([])
    };
    function _onNearestX(value, {index}) {
        setCrosshairVals(chartData.map(d => d[index])) // takes in array for multiple layers
        setHoverVals(chartData.map(d => d[index])) // takes in array for multiple layers
    };

    function formatMoney(num) {
        return (num < 1) ? num : format('.2s')(num)
    }

    return (
        <div style={{height: '500px', width: '80vw'}}>
            {/* <h2>Selected:</h2><br/>
            <span style={{fontWeight:'bold'}}>Time: </span> {moment(hoverVals[0]['x']).format('YYYY MMM DD - HH:mm:ss')} <br/>
            <span style={{fontWeight:'bold'}}>Price: </span>  {format('($,')(hoverVals[0]['y'])} <br/>
            <span style={{fontWeight:'bold'}}>Market cap:</span>  {format('($,')(hoverVals[1]['y'])} <br/>
            <span style={{fontWeight:'bold'}}>Total volumes:</span>  {format(',')(hoverVals[2]['y'])} <br/> */}
            <FlexibleXYPlot 
                // height={500} 
                // width={800}
                margin={{left: 100}}
                xType="time"
                onMouseLeave={_onMouseLeave}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis 
                    title="Date"
                    // tickFormat
                />
                <YAxis 
                    title="Currency price"
                    tickFormat={tick => formatMoney(tick)}
                />
                {/* <LineSeries 
                    data={chartData[0]} 
                    style={{
                        stroke: '#1446a0ff',
                        strokeWidth: 1
                    }}
                    onNearestX={_onNearestX}
                /> */}
                <LineSeriesCanvas 
                    data={chartData[0]} 
                    stroke='#1446a0ff'
                    strokeWidth={1}
                    onNearestX={_onNearestX}
                />
                <Crosshair 
                    values={crosshairVals}
                    itemsFormat={(title, value) => {
                        return [
                            {
                                title: 'Price',
                                value: formatMoney(title[0]['y'])
                            },
                            {
                                title: 'Market cap',
                                value: format('.4s')(title[1]['y'])
                            },
                            {
                                title: 'Total volumes',
                                value: format('.4s')(title[2]['y'])
                            }
                        ]
                    }}
                    titleFormat={(title,value) => {
                        return {
                            title: moment(title[0]['x']).format('YYYY MMM DD'),
                            value: moment(title[0]['x']).format('HH:mm')
                        }
                    }}
                    style={{
                        stroke:'red',
                        strokeWidth: 3,
                        line: {
                            backgroundColor: '#23CE6B'
                        },
                    }}
                >
                </Crosshair>
            </FlexibleXYPlot>
        </div>
    )
}
CryptoChart.propTypes = {
}

const mapStateToProps = state => ({
    // cryptoList: state.crypto && state.crypto.cryptoList
});

export default connect(mapStateToProps)(CryptoChart)