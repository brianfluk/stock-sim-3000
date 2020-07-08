import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CryptoList.scss'
import { Button, Input, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

/** Put on hold because bugs */
function CryptoList(props) {
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currPageSlice, setCurrPageSlice] = useState([])
    const [displayPageNums, setDisplayPageNums] = useState([1])
    const [listHasBeenSet, setListHasBeenSet] = useState(false)
    const [filteredList, setFilteredList] = useState((props.cryptoList && props.cryptoList.data && props.cryptoList.data.data) ? props.cryptoList.data.data : [])
    const [maxPage, setMaxPage] = useState(filteredList ? Math.floor(filteredList.length / pageSize): 0);

    function prevPage() {
        (pageNum > 0) && setPageNum(pageNum - 1)
    }
    function nextPage() {
        (pageNum < maxPage) && setPageNum(pageNum + 1)
    }
    function calcDisplayPageNums() {
        const newDisplayPageNums = Array.from(new Array(7), (x, i) => {
            return i + Math.max(0, pageNum-3) + 1 // UI paging starts at 0
        }).filter(num => num <= maxPage + 1);
        setDisplayPageNums(newDisplayPageNums)
    }
    
    async function updateCurrPageSlice(searchVal='') {

        // TODO: investigate (hint: debugger) why this function gets called with no searchVal
        // after each search WITH a searchVal. I think it's because of useEffect() -- one of those params
        // change, like pageNum.

        // calc currPage
        const listExists = Boolean(props.cryptoList && (props.cryptoList.data.code==200) && props.cryptoList.data.data);
        if (listExists && !listHasBeenSet) { // wait until redux store has been updated
            setFilteredList(props.cryptoList.data.data)
            setMaxPage(Math.floor(props.cryptoList.data.data.length / pageSize))
            setListHasBeenSet(true)
        }

        // for synchronization issues
        let newFilteredList = await listExists ? props.cryptoList.data.data.filter(entry => entry.symbol.toLowerCase().includes(searchVal) || entry.name.includes(searchVal)) : []
        await setFilteredList(newFilteredList);
        // if (searchVal) {
            // TODO: optimize - if new search contains old search, dont reset to cryptolist
            // let newFilteredList = props.cryptoList.data.data
            // await setFilteredList(newFilteredList.filter(entry => entry.symbol.toLowerCase().includes(searchVal) || entry.name.includes(searchVal)))
        // }
        const newCurrPageSlice = await listExists ? 
            newFilteredList.slice(
                pageNum * pageSize,
                Math.min((Number(pageNum) + 1)*pageSize, newFilteredList.length)) : 
            [{ "id": "bitcoin", "symbol": "btc", "name": "Bitcoin" }]
        setCurrPageSlice(newCurrPageSlice)

        if (searchVal) {
            console.log('searchval:',searchVal)
            await setMaxPage(Math.floor(newFilteredList.length / pageSize))
            // await setMaxPage(Math.floor(filteredList.length / pageSize))
        } else {
            console.log('empty search')
            if (listExists) {
                setMaxPage(Math.floor(props.cryptoList.data.data.length / pageSize))
            }
        }
        console.log('filtered list',filteredList.length)
        calcDisplayPageNums()        
    }

    function searchCoin(value, event) {
        console.log('searched for coin', value, ' / ', event.nativeEvent)
        setPageNum(0); // page 0 of filtered list
        // reset list from prev searches -- can optimize by checking if curr search .includes (prev search)
        updateCurrPageSlice(value.toLowerCase())
        // console.log('filtered list',filteredList.length)
    }

    function goToPage(event) {
        const page = Number(event.nativeEvent.target.value);
        if (event.nativeEvent.key=="Enter" && page > 0 && page <= maxPage + 1) {
            setPageNum(page - 1) // UI paging starts at 0
        }
    }

    function onPageButtonClick(event) {
        setPageNum(Number(event.nativeEvent.target.value) - 1)
    }

    useEffect(() => {
        updateCurrPageSlice()
    }, [listHasBeenSet, pageNum, pageSize, props.cryptoList, maxPage])
    

    return (
        <div className='list-container'>
            <div className='list-entries'>
                {filteredList &&
                    currPageSlice.map((val, key) => {
                        return (
                            <div style={{width:'100%', display: 'flex', justifyContent: 'space-between'}} className="list-entry">
                                <Link to={`/crypto/${val.id}`} key={key} className="crypto-link">
                                    <span style={{fontWeight:'bold'}}>{val.name}</span> &nbsp;| {val.symbol}
                                </Link>
                                <Tooltip placement="right" title="Add to watchlist">
                                    <Button type="primary"><PlusOutlined /></Button>
                                </Tooltip>
                            </div>
                        )
                    })
                    // <List dataSource={currPage}/>
                }
            </div>

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
                <Input className="go-to-page-input" onKeyUp={goToPage} placeholder=''/>{` /${maxPage + 1}`}
                <Input.Search className="crypto-nav-search" onSearch={searchCoin} placeholder="Search for crypto" enterButton={true}/>
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