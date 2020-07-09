import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CryptoList.scss'
import { Button, Input, Tooltip, Table, Space } from 'antd';
import { LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


/** Put on hold because bugs */
function CryptoList(props) {
    const [listHasBeenSet, setListHasBeenSet] = useState(false)
    const [filteredList, setFilteredList] = useState((props.cryptoList && props.cryptoList.data && props.cryptoList.data.data) ? props.cryptoList.data.data : [])
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    let searchInput = useRef()

    useEffect(()=> {
        const listExists = Boolean(props.cryptoList && (props.cryptoList.data.code==200) && props.cryptoList.data.data);
        if (listExists && !listHasBeenSet) { // wait until redux store has been updated
            setFilteredList(props.cryptoList.data.data)
            setListHasBeenSet(true)
        }
    }, [props.cryptoList, listHasBeenSet])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // this.setState({
        //     searchText: selectedKeys[0],
        //     searchedColumn: dataIndex,
        // });
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        // this.setState({ searchText: '' });
        setSearchText('')
    };

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
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(function() {searchInput.select()});
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
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
            key: 'symbol'
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Tooltip title={`Add ${record.symbol} to watchlist`} placement="right">
                    <Button type="primary" style={{ padding: '2px 10px'}}>
                        <PlusOutlined />
                    </Button>
                </Tooltip>
            ),
            width: '32px',
        }
    ]

    return (
        <Table columns={columns} dataSource={filteredList} className="crypto-list-table"/>
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