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
      pothole: null, // this will be an object
      potholes: null,
      // Example info
      // pothole: {
      //   image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1572899303/potholes/big-pothole-card_mkzzjc.jpg',
      //   description: 'Hello, I am here to flatten your tires',
      //   rating: 2,
      //   location: 'The street',
      // },
    };
    this.setPothole = this.setPothole.bind(this);
  }

  componentDidMount() {
    axios.get('/pothole')
      .then((response) => {
        this.setState({
          potholes: response.data,
        });
        // this.setPothole(response.body);
      });
  }

  setPothole(pothole) {
    this.setState({
      pothole
    });
  }

  // pass location into request body to get specific pothole
  getPothole() {
    return axios.get('/pothole')
      .then((response) => {
        this.setPothole(response.body);
      });
  }

  render() {
    // get props from pothole object to pass to Pothole component
    const { pothole, potholes } = this.state;
    let mappedPotholes;
    // const {
    //   image,
    //   description,
    //   rating,
    //   location
    // } = pothole; //!Array.isArray(potholes)

    if (potholes !== null && potholes.length) {
      mappedPotholes = potholes.map(mappedPothole => (
        <div>
          <Pothole
            image={mappedPothole.image}
            description={mappedPothole.description}
            rating={mappedPothole.severity}
            location={mappedPothole.location}
            progress={Math.floor((mappedPothole.money_donated / mappedPothole.fill_cost) * 100)}
          />
          <br />
        </div>
      ));
    } else {
      mappedPotholes = <h3>Loading potholes...</h3>;
    }

    return (
      <div>
        <Link id="CreatePothole" to="/create">Add A Pothole</Link>
        {mappedPotholes}
        {/* <Pothole image={image} description={description} rating={rating} location={location} /> */}
      </div>
    );
  }
}
