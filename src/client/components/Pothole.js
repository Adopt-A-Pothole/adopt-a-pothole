import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Container, Rating, Progress } from 'semantic-ui-react';

export default class Pothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      // progress: null,
    };
    this.setComment = this.setComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleDonation = this.handleDonation.bind(this);
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

  handleDonation() {
    // whatever needs to happen for donations, assuming location may be needed
    const { location } = this.props;
  }

  render() {
    const {
      image,
      description,
      rating,
      location
    } = this.props;

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
              <button type="button" className="ui primary button" onClick={this.handleDonation}>Donate Here</button>
            </Card.Content>
            <Card.Content>
              <p>Percent Funded: </p>
              <Progress percent={60} progress indicating />
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
}

Pothole.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired
};
