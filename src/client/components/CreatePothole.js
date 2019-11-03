import React, { Component } from 'react';
import Rating from 'react-rating';
import axios from 'axios';

export default class CreatePothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      severity: 0,
      description: null,
      image: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleRating = this.handleRating.bind(this);
  }

  // handle form submit
  handleSubmit() {
    const formData = this.state;
    // send post request to /potholes
    axios.post('/potholes', { formData })
      .then(() => {
        console.log('pothole created');
      })
      .catch(() => {
        console.log('something went wrong');
      });
  }

  // handle address change
  handleAddress(event) {
    const address = event.target.value;
    this.setState({
      address,
    });
  }

  // handle severity score
  handleRating(event) {
    const severity = event;
    this.setState({
      severity,
    });
  }

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
      handleRating,
    } = this;
    const { severity } = this.state;
    return (
      <div>
        <hr />
        <h1> Create Pothole </h1>
        <h3>Type in Address of Pothole</h3>
        <input type="text" onChange={handleAddress} />
        <h3>How Bad is it?</h3>
        <Rating
          stop={3}
          placeholderRating={severity}
          onClick={handleRating}
        />
        <h3>Picture url</h3>
        <input type="text" onChange={handleImage} />
        <h3>Description</h3>
        <input type="text" onChange={handleDescription} />
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
          >
            Report Pothole
          </button>
        </div>
        <hr />
      </div>
    );
  }
}
