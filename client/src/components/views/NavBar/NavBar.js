import React from 'react';
// import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Menu, Layout } from 'antd';
import { StockOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import './Sections/Navbar.css';
import { useSelector } from "react-redux";
import axios from 'axios';
import { USER_SERVER } from './../../Config';
import './navBar.scss';

const { Header } = Layout;

function NavBar(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) { // not logged in
    return (

      <Header style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%'  }} >
        <Menu  theme="dark" mode="horizontal">
          <Menu.Item className="no-selection" key='main' style={{width: '200px'}}>
            <StockOutlined />
            <Link to='/'>Investment Simulator</Link>
          </Menu.Item>
          <Menu.Item key='about'>
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key='leaderboards'>
            <Link to="/leaderboards">Leaderboards</Link>
          </Menu.Item>
          <Menu.Item key="signin" style={{float: 'right'}}>
            <Link to="/login">Signin</Link>
          </Menu.Item>
          <Menu.Item key="signup" style={{float: 'right'}}>
            <Link to="/register">Signup</Link>
          </Menu.Item>
        </Menu>
      </Header>
      
    )
  } else {
    return (

      <Header style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%'  }} >
        <Menu className="no-selection" theme="dark" mode="horizontal">
          <Menu.Item className="no-selection" key='main' style={{width: '200px'}}>
            <StockOutlined />
            <Link to='/'>Investment Simulator</Link>
          </Menu.Item>
          <Menu.Item key='about'>
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key='leaderboards'>
            <Link to="/leaderboards">Leaderboards</Link>
          </Menu.Item>
          <Menu.Item key="logout" style={{float: 'right'}}>
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
      </Header>
      
    )
  }
  
}

export default withRouter(NavBar);