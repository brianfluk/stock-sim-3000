import React from 'react';
// import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Menu, Layout } from 'antd';
import { StockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import './Sections/Navbar.css';


const { Header } = Layout;

function NavBar() {

  return (

    <Header style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%'  }} >
      <Menu theme="dark" mode="horizontal">
        <Menu.Item>
          <StockOutlined />
          <a href="/">Stocks</a>
        </Menu.Item>
        <div style={{float: 'right'}}><RightMenu /></div>
      </Menu>
    </Header>

  )
}

export default withRouter(NavBar);