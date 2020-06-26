import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './cryptoList.scss'
import { List, Button } from 'antd';

function CryptoList(props) {
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currPage, setCurrPage] = useState([])
    const [listHasBeenSet, setListHasBeenSet] = useState(false)
    let maxPage = (props.cryptoList && props.cryptoList.data && props.cryptoList.data.data) ? Math.floor(props.cryptoList.data.data.length / pageSize) : 0// needs recalculating when change pagesize
    
    // // for displaying page numbers if needed
    // const pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    //   pageNumbers.push(i);
    // }

    function prevPage() {
        (pageNum > 0) && setPageNum(pageNum - 1)
    }
    function nextPage() {
        (pageNum <= maxPage) && setPageNum(pageNum + 1)
    }
    useEffect(() => {
        async function updateCurrPageSlice() {
            // calc currPage
            const listExists = Boolean(props.cryptoList && (props.cryptoList.data.code==200) && props.cryptoList.data.data);
            const currPageSlice = await listExists ? 
                props.cryptoList.data.data.slice(
                    pageNum * pageSize,
                    Math.min((pageNum + 1)*pageSize, props.cryptoList.data.data.length)) : 
                [{ "id": "bitcoin", "symbol": "btc", "name": "Bitcoin" }]
            setCurrPage(currPageSlice)
            setListHasBeenSet(true)
        }
        updateCurrPageSlice()
        
    }, [listHasBeenSet, pageNum, pageSize, props.cryptoList])

    return (
        <div >
            <Button type="primary" onClick={prevPage}>prev</Button>
            <Button type="primary" onClick={nextPage}>next</Button>
            <span style={{ fontSize: '14px' }}>
                {props.cryptoList && (props.cryptoList.data.code==200) && props.cryptoList.data.data &&
                    // JSON.stringify(currPage);
                    currPage.map((val, key) => {
                        return <Button key={key}>{val.name} | {val.symbol}</Button>
                    })
                    // <List dataSource={currPage}/>
                }
            </span>
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