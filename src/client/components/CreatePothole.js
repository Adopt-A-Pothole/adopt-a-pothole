import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      severity: null,
      description: null,
      image: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  // handle form submit
  handleSubmit() {
    // send post request to /potholes
  }

  // handle address change
  handleAddress(event) {
    const address = event.target.value;
    this.setState({
      address,
    });
  }

  // handle severity score

  // handle description change
  handleDescription(event) {
    const description = event.target.value;
    this.setState({
      description,
    });
  }

  // handle image change
  handleImage(event) {
    const image = event.target.value;
    this.setState({
      image,
    });
  }

  render() {
    const {
      handleSubmit,
      handleAddress,
      handleDescription,
      handleImage,
    } = this;
    return (
      <div>
        <hr />
        <h1> Create Pothole </h1>
        <h3>Type in Address of Pothole</h3>
        <input type="text" onChange={handleAddress} />
        <h3>How Bad is it?</h3>
        <button type="submit">Small</button>
        <button type="submit">Medium</button>
        <button type="submit">Big as Hell</button>
        <h3>Picture url</h3>
        <input type="text" onChange={handleImage} />
        <h3>Description</h3>
        <input type="text" onChange={handleDescription} />
        <div>
          <button onClick={handleSubmit} type="submit">Report Pothole</button>
        </div>
        <hr />
      </div>
    );
  }
}
