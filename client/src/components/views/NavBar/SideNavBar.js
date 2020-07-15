import React from 'react';
// import LeftMenu from './Sections/LeftMenu';
import { } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Layout, Menu } from 'antd';
import { ToolFilled, FolderOutlined, SearchOutlined, StarOutlined , StockOutlined, CopyrightCircleOutlined } from '@ant-design/icons';

const { Sider } = Layout;

function SideNavBar(props) {
  const user = useSelector(state => state.user)
  const [collapsed, setCollapsed] = useState(false)

  function onCollapse (val) {
    setCollapsed(val)
  }

  return (
    <Sider
      mode="inline"
      breakpoint="lg"
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        paddingTop: '60px',
      }}
      className='sider-theme no-select mobile-collapse'
    >
      <div className="logo" />
      <Menu 
        theme="light"
        mode="inline" 
        defaultSelectedKeys={['1']}
        style={{borderRight: 'none'}}
        // className='sider-menu'
      >
        {(user.userData && user.userData.isAuth) &&
          <Menu.Item key="portfolio" icon={<FolderOutlined />}>
            <Link to="/portfolio">Portfolio</Link>
          </Menu.Item>
        }
        {(user.userData && user.userData.isAuth) &&
          <Menu.Item key="watchlist" icon={<StarOutlined />}>
            <Link to="/watchlist">Watchlist</Link>
          </Menu.Item>
        }
        {/* <Menu.SubMenu key="sub1"  title="Browse"icon={<SearchOutlined />}> */}
          <Menu.Item key="stocks" icon={<StockOutlined />}>
            <Link to="/browse-stocks" >Stocks</Link>
          </Menu.Item>
          <Menu.Item key="crypto" icon={<CopyrightCircleOutlined />}>
            <Link to='/browse-crypto'>Cryptocurrencies</Link>
          </Menu.Item>
        {/* </Menu.SubMenu> */}
        
        {(user.userData && user.userData.isAuth) &&
          <Menu.Item key="preferences" icon={<ToolFilled />}>
            <Link to="/preferences">Preferences</Link>
          </Menu.Item>
        }
      </Menu>
    </Sider>
  )

}

export default withRouter(SideNavBar);