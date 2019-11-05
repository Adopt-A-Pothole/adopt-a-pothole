import React, { Component } from 'react';
import '../app.css';
import CreatePothole from './CreatePothole';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // pothole: null, // this will be an object
      // Example info
      pothole: {
        image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1572899303/potholes/big-pothole-card_mkzzjc.jpg',
        description: 'Hello, I am here to flatten your tires',
        rating: 2,
        location: 'The street',
      },
    };
    this.setPothole = this.setPothole.bind(this);
  }

  componentDidMount() {
    // axios.get('/pothole')
    //   .then((response) => {
    //     this.setPothole(response.body);
    //   });
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
    return (
      <div>
        <Link id="CreatePothole" to="/create">Add A Pothole</Link>
        <Pothole image={image} description={description} rating={rating} location={location} />
      </div>
    );
  }
}
