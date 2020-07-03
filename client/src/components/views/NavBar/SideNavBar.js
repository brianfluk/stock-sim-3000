import React from 'react';
// import LeftMenu from './Sections/LeftMenu';
import { } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import './sideNavBar.scss';
import { useState } from 'react';

import { Layout, Menu } from 'antd';
import { UserOutlined, ToolFilled, FolderOutlined, SearchOutlined  } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function SideNavBar(props) {
  const [collapsed, setCollapsed] = useState(false)

  function onCollapse (val) {
    setCollapsed(val)
  }

  return (
    <Sider
      mode="inline"
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        paddingTop: '64px',
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="2" icon={<FolderOutlined />}>
          Portfolio
        </Menu.Item>
        {/* <Menu.Item key="3" icon={<SearchOutlined />}>
          Browse
        </Menu.Item> */}
        <Menu.SubMenu key="sub1"  title="Browse"icon={<SearchOutlined />}>
          <Menu.Item key="3">Stocks</Menu.Item>
          <Menu.Item key="4">Crypto</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="5" icon={<ToolFilled />}>
          Preferences
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default withRouter(SideNavBar);