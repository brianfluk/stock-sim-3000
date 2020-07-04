import React, { Suspense, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import AboutPage from './views/AboutPage/AboutPage.js';
import BrowseCryptoPage from './views/Crypto/BrowseCryptoPage.js';
import BrowseStocksPage from './views/Stocks/BrowseStocksPage.js';
import PreferencesPage from './views/PreferencesPage/PreferencesPage.js';
import LeaderboardsPage from './views/LeaderboardsPage/LeaderboardsPage.js';
import PortfolioPage from './views/PortfolioPage/PortfolioPage.js';
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import SideNavBar from "./views/NavBar/SideNavBar";

import { useDispatch } from "react-redux";
import { getCryptoList } from "../_actions/crypto_actions";

import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  // load list of crypto
  const dispatch = useDispatch();
  let rendered = false;
  useEffect(function() {
      dispatch(getCryptoList()).then(response => {
          rendered = true
      })
  }, [rendered])

  // side nav bar
  const [collapsed, setCollapsed] = useState(false);
  function toggleCollapsed() { setCollapsed(!collapsed); }


  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Layout
        style={{height: '100%'}}
      >
        <NavBar />
        <Layout>
          <SideNavBar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                  <Route exact path="/" component={Auth(LandingPage, null)} />
                  <Route exact path="/login" component={Auth(LoginPage, false)} />
                  <Route exact path="/register" component={Auth(RegisterPage, false)} />
                  <Route exact path="/about" component={AboutPage} />
                  <Route exact path="/preferences" component={Auth(PreferencesPage, true)} />
                  <Route exact path="/browse-crypto" component={Auth(BrowseCryptoPage, null)} />
                  <Route exact path="/browse-stocks" component={Auth(BrowseStocksPage, null)} />
                  <Route exact path="/portfolio" component={Auth(PortfolioPage, true)} />
                  <Route exact path="/leaderboards" component={Auth(LeaderboardsPage, null)} />
                  <Redirect to={Auth(LandingPage, null)} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>By Brian <GithubOutlined /></Footer>
          </Layout>
        </Layout>
      </Layout>
    </Suspense>
  );
}

export default App;
