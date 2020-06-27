import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './cryptoList.scss'
import { List, Button, Pagination, Input } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function CryptoList(props) {
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currPageSlice, setCurrPageSlice] = useState([])
    const [displayPageNums, setDisplayPageNums] = useState([1])
    const [listHasBeenSet, setListHasBeenSet] = useState(false)
    // const [filteredList, setFilteredList] = useState((props.cryptoList && props.cryptoList.data && props.cryptoList.data.data) ? props.cryptoList.data.data : [])
    
    let totalLen = (props.cryptoList && props.cryptoList.data && props.cryptoList.data.data) ? props.cryptoList.data.data.length: 0// needs recalculating when change pagesize
    // let totalLen = filteredList.length;
    let maxPage = Math.floor(totalLen / pageSize)// needs recalculating when change pagesize
    
    function prevPage() {
        (pageNum > 0) && setPageNum(pageNum - 1)
    }
    function nextPage() {
        (pageNum < maxPage) && setPageNum(pageNum + 1)
    }
    function calcDisplayPageNums() {
        const newDisplayPageNums = Array.from(new Array(7), (x, i) => {
            return i + Math.max(0, pageNum-3) + 1 // UI paging starts at 0
        }).filter(num => num <= maxPage);
        setDisplayPageNums(newDisplayPageNums)
    }
    
    async function updateCurrPageSlice() {
        // calc currPage
        const listExists = Boolean(props.cryptoList && (props.cryptoList.data.code==200) && props.cryptoList.data.data);
        // const listExists = Boolean(filteredList)
        const newCurrPageSlice = await listExists ? 
            props.cryptoList.data.data.slice(
                pageNum * pageSize,
                Math.min((Number(pageNum) + 1)*pageSize, props.cryptoList.data.data.length)) : 
            [{ "id": "bitcoin", "symbol": "btc", "name": "Bitcoin" }]
        setCurrPageSlice(newCurrPageSlice)
        setListHasBeenSet(true)
        calcDisplayPageNums()        
    }

    function searchCoin(value, event) {
        console.log('searched for coin', value, ' / ', event.nativeEvent)
        // filter list 
    }

    function goToPage(event) {
        const page = Number(event.nativeEvent.target.value);
        if (event.nativeEvent.key=="Enter" && page > 0 && page <= maxPage) {
            setPageNum(page - 1) // UI paging starts at 0
        }
    }

    function onPageButtonClick(event) {
        setPageNum(Number(event.nativeEvent.target.value) - 1)
    }

    useEffect(() => {
        updateCurrPageSlice()
    }, [listHasBeenSet, pageNum, pageSize, props.cryptoList])
    

    return (
        <div className='list-container'>
            {props.cryptoList && (props.cryptoList.data.code==200) && props.cryptoList.data.data &&
                // JSON.stringify(currPage);
                currPageSlice.map((val, key) => {
                    return <Button key={key}><span style={{fontWeight:'bold'}}>{val.name}</span> &nbsp;| {val.symbol}</Button>
                })
                // <List dataSource={currPage}/>
            }
            <div className="list-nav-container">
                <Button type="primary" onClick={prevPage}><LeftOutlined /></Button>
                <div className="page-num-container">
                    {displayPageNums.map((val, key) => {
                        if (val == pageNum + 1) {
                            return <Button type="primary" ghost="true" onClick={onPageButtonClick} value={val}>{val}</Button>
                        }
                        return <Button onClick={onPageButtonClick} value={val}>{val}</Button>
                    })}
                </div>
                <Button type="primary" onClick={nextPage}><RightOutlined /></Button>
            </div>
            <div className='list-nav-secondary'>
                <p>Go&nbsp;to:</p>
                <Input className="go-to-page-input" onKeyUp={goToPage} placeholder={` /${maxPage}`}/>
                <Input.Search onSearch={searchCoin} placeholder="Search for crypto" enterButton={true}/>
            </div>
            {/* <Pagination className="ant-pagination" current={pageNum} pageSize={pageSize} showSizeChanger={false} total={1000}/> */}
        </div>
    )
}
CryptoList.propTypes = {
    cryptoList: PropTypes.object
}

const mapStateToProps = state => ({
    cryptoList: state.crypto && state.crypto.cryptoList
});
/**  USAGE: <CryptoList cryptoList={props.cryptoList}/> 
 * where props.cryptoList is in format of:
*/
// {
//     "data": {
//       "success": true,
//       "message": "OK",
//       "code": 200,
//       "data": [
//         {
//           "id": "01coin",
//           "symbol": "zoc",
//           "name": "01coin"
//         },
//         {
//           "id": "02-token",
//           "symbol": "o2t",
//           "name": "O2 Token"
//         }
//     }
// }

export default connect(mapStateToProps)(CryptoList)