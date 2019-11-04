import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


import App from './components/App';
import CreatePothole from './components/CreatePothole';
import Pothole from './components/Pothole';

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li>
          <Link to="/create">Add a Pothole</Link>
        </li> */}
        {/* <li>
          <Link to="/pothole">Pothole</Link>
        </li> */}
      </ul>
      <Route exact path="/" component={App} />
      <Route path="/create" component={CreatePothole} />
      <Route path="/pothole" component={Pothole} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
