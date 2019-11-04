import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../app.css';
import Pothole from './Pothole';
// import CreatePothole from './CreatePothole';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // pothole: null, // this will be an object
      // Example info
      pothole: {
        image: '../../../public/favicon.ico',
        description: 'Hello, I am here to flatten your tires',
        rating: 2,
        location: 'The street',
      },
    };
  }

  componentDidMount() {
    axios.get('/pothole')
      .then((response) => {
        this.setPothole(response.body);
      });
  }

  setPothole(pothole) {
    this.setState({
      pothole
    });
  }

  // maybe pass parameters here to get a new pothole
  getPothole() {
    return axios.get('/pothole')
      .then((response) => {
        this.setPothole(response.body);
      });
  }

  render() {
    // get props from pothole object to pass to Pothole component
    const { pothole } = this.state;
    const {
      image,
      description,
      rating,
      location
    } = pothole;

    return (
      <div>
        <h1>Our App</h1>
        <Link to="/create">Add a Pothole</Link>
        <Pothole image={image} description={description} rating={rating} location={location} />
      </div>
    );
  }
}
