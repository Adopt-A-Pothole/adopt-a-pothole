import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
  Container,
  Rating,
  Progress,
  Button,
} from 'semantic-ui-react';
import axios from 'axios';

export default class Pothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      donationForm: false,
      donation: 0,
    };
    this.setComment = this.setComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleDonation = this.handleDonation.bind(this);
    this.toggleDonation = this.toggleDonation.bind(this);
    this.handleDonationInput = this.handleDonationInput.bind(this);
  }
  // needs state because commenting will effect this component
  // this probably doesnt need image, description, rating, and location on state

  setComment(event) {
    this.setState({
      comment: event.target.value,
    });
  }

  submitComment() {
    const { comment } = this.state;
    // probably post comment to specific pothole
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
    axios.post('/donate', { donation, location: 'POTHOLE ID HERE' })
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
      image,
      description,
      rating,
      location,
      progress,
      index,
      onClick
    } = this.props;
    const { donationForm, donationMessage } = this.state;

    return (
      <div id="pothole-profile">
        <Container textAlign="center">
          <Card className="ui centered card">
            <Image src={image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Axle-breaker</Card.Header>
              <Card.Meta>
                <span className="date">{location}</span>
              </Card.Meta>
              <Card.Description>
                {description}
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <p>How bad is it?</p>
              <Rating defaultRating={rating} maxRating={3} disabled />
            </Card.Content>
            <Card.Content extra>
              <button
                type="button"
                className="ui primary button"
                onClick={this.toggleDonation}
              >
                  Donate
              </button>
              {donationForm ? (
                <div>
                  <input type="text" placeholder="Donation ex. 10.50" onChange={this.handleDonationInput} />
                  <button type="button" onClick={this.handleDonation}>Pay with Paypal</button>
                </div>
              )
                : <div />}
            </Card.Content>
            <Card.Content>
              <p>Percent Funded: </p>
              <Progress percent={progress} progress indicating />
            </Card.Content>
          </Card>
          <Button type="button" onClick={() => { onClick(index); }}>Next</Button>
        </Container>
      </div>
    );
  }
}

Pothole.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};
