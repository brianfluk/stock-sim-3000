import React from 'react';
// import LeftMenu from './Sections/LeftMenu';
import { } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import './SideNavBar.scss';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Layout, Menu } from 'antd';
import { ToolFilled, FolderOutlined, SearchOutlined  } from '@ant-design/icons';

const { Sider } = Layout;

function SideNavBar(props) {
  const user = useSelector(state => state.user)
  const [collapsed, setCollapsed] = useState(false)

  function onCollapse (val) {
    setCollapsed(val)
  }

  if (user.userData && !user.userData.isAuth) { // not logged in  
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
          borderRight: '1px solid #f0f0f0 !important'
        }}
        className='no-select'
      >
        <div className="logo" />
        <Menu 
          theme="light"
          mode="inline" 
          defaultSelectedKeys={['1']}
          style={{borderRight: 'none'}}
        >
          <Menu.SubMenu key="sub1"  title="Browse"icon={<SearchOutlined />}>
            <Menu.Item key="3">
              <Link to="/browse-stocks">Stocks</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to='browse-crypto'>Crypto</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
    )
  } else {
    return (
      <Sider
        mode="inline"
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        theme="light"
        style={{
          paddingTop: '60px',
        }}
        className='no-select'
      >
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="2" icon={<FolderOutlined />}>
            <Link to="portfolio">Portfolio</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub1"  title="Browse"icon={<SearchOutlined />}>
            <Menu.Item key="3">
              <Link to="/browse-stocks">Stocks</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to='browse-crypto'>Crypto</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="5" icon={<ToolFilled />}>
            <Link to="preferences">Preferences</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(SideNavBar);