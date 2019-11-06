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
    };
    this.setPothole = this.setPothole.bind(this);
    this.renderPothole = this.renderPothole.bind(this);
  }

  componentDidMount() {
    axios.get('/pothole')
      .then((response) => {
        this.setState({
          potholes: response.data,
        });
      })
      .then(() => this.setPotholes());
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

  setPotholes() {
    let mappedPotholes;
    const { potholes } = this.state;
    if (potholes !== null && potholes.length) {
      mappedPotholes = potholes.map((mappedPothole, index) => (
        <div>
          <Pothole
            onClick={this.renderPothole}
            index={index}
            image={mappedPothole.image}
            description={mappedPothole.description}
            rating={mappedPothole.severity}
            location={mappedPothole.location}
            progress={Math.floor((mappedPothole.money_donated / mappedPothole.fill_cost) * 100)}
          />
          <br />
        </div>
      ));
      this.setState({ potholes: mappedPotholes });
      this.setState({ pothole: mappedPotholes[0] }); // set first pothole
    } else {
      mappedPotholes = <h3>Loading potholes...</h3>;
    }
    return mappedPotholes;
  }

  renderPothole(index) {
    const { potholes } = this.state;
    if (index === 2) {
      this.setState({ pothole: potholes[0] });
    } else {
      this.setState({ pothole: potholes[index + 1] });
    }
  }

  render() {
    // get props from pothole object to pass to Pothole component
    const { pothole, potholes } = this.state;

    return (
      <div>
        <Link id="CreatePothole" to="/create">Add A Pothole</Link>
        {pothole}
      </div>
    );
  }
}
