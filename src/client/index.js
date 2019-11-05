import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
// semantic ui import
import 'semantic-ui-css/semantic.min.css';
import { Menu, Header } from 'semantic-ui-react';


import App from './components/App';
import CreatePothole from './components/CreatePothole';
import Pothole from './components/Pothole';

const routing = (
  <Router>
    <div>
      <Menu>
        <Menu.Item>
          <Header as="h1">Adopt A Pothole</Header>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/create">Add A Pothole</Link>
        </Menu.Item>
      </Menu>
      <Route exact path="/" component={App} />
      <Route path="/create" component={CreatePothole} />
      <Route path="/pothole" component={Pothole} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
