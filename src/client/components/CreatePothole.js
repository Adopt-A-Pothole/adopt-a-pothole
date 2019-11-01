import React, { Component } from 'react';

export default class CreatePothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      severity: null,
      description: null,
      image: null,
    };
  }

  render() {
    return (
      <div>
        <h1> Create Pothole </h1>
        <h3>Type in Address of Pothole</h3>
        <input type="text" />
        <h3>How Bad is it?</h3>
        <button>Small</button>
        <button>Medium</button>
        <button>Big as Hell</button>
        <h3>Picture url</h3>
        <input type="text"/>
      </div>
    );
  }
}
