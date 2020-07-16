import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CryptoList.scss'
import { Button, Input, Tooltip, Table, Space, Alert } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios'


function CryptoList(props) {
    const [listHasBeenSet, setListHasBeenSet] = useState(false)
    const [filteredList, setFilteredList] = useState((props.cryptoList && props.cryptoList.info && props.cryptoList.info.data) ? props.cryptoList.info.data : [])
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [noWatchlists, setNoWatchlists] = useState(false)
    const [hasWatchlist, setHasWatchlist] = useState(false)
    const [watchlists, setWatchlists] = useState([{
      name: '',
      _id: '',
      coins: [],
      stocks: []
    }])

    let searchInput = useRef()

    useEffect(()=> {
        const listExists = Boolean(props.cryptoList && (props.cryptoList.info.code==200) && props.cryptoList.info.data);
        if (listExists && !listHasBeenSet) { // wait until redux store has been updated
            setFilteredList(props.cryptoList.info.data)
            if (props.user && props.user.userData && props.user.userData.isAuth) {
              getWatchlists()
            }
            setListHasBeenSet(true)
        }
    }, [props.cryptoList, listHasBeenSet])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('')
    };

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

    function addCryptoToWatchlist(wid, cid) {
      if (props.user && props.user.userData && props.user.userData.isAuth) {
        if (!wid) { 
          console.log('no watchlist provided')
          return -1
        }
        axios.post('/api/watchlist/add-crypto', {
          watchlistId:  wid,
          coinId: cid
        }).then(response => {
          if (response.status == 200) {
            getWatchlists()
            return 1 
          }
        }).catch(err => {
          console.log(err)
          return -1
        })
      }
    }
    function removeCryptoFromWatchlist(wid, cid) {
      if (props.user && props.user.userData && props.user.userData.isAuth) {
        if (!wid) { 
          console.log('no watchlist provided')
          return -1
        }
        axios.post('/api/watchlist/remove-crypto', {
          watchlistId:  wid,
          coinId: cid
        }).then(response => {
          if (response.status == 200) {
            getWatchlists()
            return 1 // to let button know to mark itself unavailable
          }
        }).catch(err => {
          console.log(err)
          return -1
        })
      }
    }

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={function(node) {
                searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <Tooltip title="Filter"><SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} /></Tooltip>,
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(function() {searchInput.select()});
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            dataIndex === 'name' ? 
            <Link to={`/crypto/${text}`}>
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
              />
            </Link>
            :
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            dataIndex === 'name' ? 
              <Link to={`/crypto/${text}`}>
                {text} 
              </Link>
            : ( text )
          ),
    });
    
    

    const columns = [
        {
            title: 'Coin name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={`/crypto/${record.id}`}>
                    {record.name}
                </Link>
            ),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
            ...getColumnSearchProps('symbol'),
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => {
              if (! watchlists[0].coins.includes(record.id)) {
                return (
                <Tooltip title={`Add ${record.symbol} to watchlist`} placement="right">
                
                  <Button 
                  type="primary" style={{ padding: '2px 10px'}}
                  onClick={()=>addCryptoToWatchlist(watchlists[0]._id, record.id)}
                  >
                      <PlusOutlined />
                  </Button>           
              </Tooltip>)
              } else {
                return (
                  <Tooltip title={`Remove ${record.symbol} from watchlist`} placement="right">
                    <Button 
                      type="danger" style={{ padding: '2px 10px'}}
                      onClick={()=>removeCryptoFromWatchlist(watchlists[0]._id, record.id)}
                    >
                      <MinusOutlined />
                    </Button>
                  </Tooltip>
                )
              }
                
          },
            width: '32px',
        }
    ]

    return (
      <div>
        {noWatchlists &&
          <Alert type="warning" message="No watchlists found for user. Please go to /watchlists to create one."/>
        }
        <Table columns={columns} dataSource={filteredList} className="crypto-list-table"/>
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