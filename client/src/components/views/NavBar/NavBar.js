import React from 'react';
// import LeftMenu from './Sections/LeftMenu';
// import LogoutMenu from './Sections/LogoutMenu';
import { Menu, Layout } from 'antd';
// import { StockOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { USER_SERVER } from './../../Config';
import logoLight from '../../../assets/logo512_dark_nobg.png';

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

  return (

    <Header className='no-select' style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%'  }} >
      <Menu 
        mode="horizontal"
        className="navbar-header-menu"
      >
        <Menu.Item className="no-selection" key='main' style={{width: '200px'}}>
          {/* <StockOutlined /> */}
          <img src={logoLight} alt='logo' style={{height:'30px', marginRight:'10px' }}/>
          <Link to='/'><span className="nav-logo">StockSim3000</span></Link>
        </Menu.Item>
        <Menu.Item key='about'>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key='leaderboards'>
          <Link to="/leaderboards">Leaderboards</Link>
        </Menu.Item>

        {/* not signed in */}
        {(user.userData && !user.userData.isAuth) &&
          <Menu.Item key="signin" style={{float: 'right'}}>
            <Link to="/login">Signin</Link>
          </Menu.Item>
        }
        {(user.userData && !user.userData.isAuth) &&
          <Menu.Item key="signup" style={{float: 'right'}}>
            <Link to="/register">Signup</Link>
          </Menu.Item>
        }

        {/* signed in */}
        {!(user.userData && !user.userData.isAuth) &&
          <Menu.Item key="logout" style={{float: 'right'}}>
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        }

        
      </Menu>
    </Header>
    
  )
  
}

export default withRouter(NavBar);