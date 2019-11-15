import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, } from 'react-router-dom';
import { Auth0Provider } from './react-auth0-spa';
import App from './app';
import config from './auth_config.json';
// semantic ui import
import 'semantic-ui-css/semantic.min.css';
import { Menu, Header } from 'semantic-ui-react';


import Appp from './components/App';
import CreatePothole from './components/CreatePothole';
import Pothole from './components/Pothole';
import MapContainer from './components/Map';
import PotholeList from './components/PotholeList';
import NavBar from './components/NavBar';

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};


const routing = (
  <Router>
    <div>
      <Menu>
        <Menu.Item>
          <Header as="h1">Adopt A Pothole</Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/map">
          Map
        </Menu.Item>
        <Menu.Item as={Link} to="/create">
          Report Pothole
        </Menu.Item>
        <Menu.Item as={Link} to="/list">
          All Potholes
        </Menu.Item>
        <Menu.Item as={Link} to="/helpANeighbor">
          All Potholes
        </Menu.Item>
        <Menu.Menu position="right">
          <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
          >
            <App />
          </Auth0Provider>
        </Menu.Menu>
      </Menu>
      <Route exact path="/" component={Appp} />
      <Route path="/create" component={CreatePothole} />
      <Route path="/pothole" component={Pothole} />
      <Route path="/map" component={MapContainer} />
      <Route path="/list" component={PotholeList} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
