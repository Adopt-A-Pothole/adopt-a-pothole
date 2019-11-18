import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header ,} from 'semantic-ui-react';
import axios from 'axios';
import PotholeInNeed from './PotholeInNeed';

export default class HelpANeighbor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      potholes: null,
      donationForm: false,
      donation: 0
    };
    this.handleDonation = this.handleDonation.bind(this);
    this.toggleDonation = this.toggleDonation.bind(this);
    this.handleDonationInput = this.handleDonationInput.bind(this);
  }

  componentDidMount() {
    axios.get('/neighbor')
      .then((response) => {
        this.setState({
          potholes: response.data // ! <-- response is an array of objects
        });
      });
  }

  toggleDonation() {
    let { donationForm } = this.state;
    donationForm = !donationForm;
    this.setState({
      donationForm,
    });
  }

  handleDonation() {
    const { donation } = this.state;
    // grab pothole id and input value
    axios.post('/donate', { donation, id: this.props.id })
      .then((response) => {
        if (response.data === 'invalid') {
          console.log('payment unsuccessful');
        } else {
          // redirect to paypal
          window.location.href = response.data;
          console.log('payment was successful');
          this.toggleDonation();
        }
      });
  }

  handleDonationInput(event) {
    const donation = event.target.value;
    this.setState({
      donation,
    });
  }

  render() {
    const {
      potholes,
      donationForm
    } = this.state;
    if (potholes !== null && potholes.length) { // <-- if not null and the lengeth is greater than 1
      return (
        <div>
          <h2 className="ui center aligned header">
            <img src="https://i.imgur.com/ERzSwhh.png"></img>
            <div className="content">
              Help A Neighbor
              <div className="sub header">Contribute to a pothole in your community.</div>
            </div>
          </h2>
          <Grid columns="four">
            <Grid.Row>
              {Object.keys(potholes).map(pothole => (
                <Grid.Column>
                  <PotholeInNeed
                    pothole={potholes[pothole]}
                    donationForm={donationForm}
                    toggleDonation={this.toggleDonation}
                    handleDonationInput={this.handleDonationInput}
                    handleDonation={this.handleDonation}
                  />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </div>
      );
    } else {
      return <h3>Loading potholes...</h3>;
    }
  }
}
