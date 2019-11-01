import React, { Component } from 'react';
import '../app.css';
import CreatePothole from './CreatePothole';

export default class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1>Our App</h1>
        <CreatePothole />
      </div>
    );
  }
}
