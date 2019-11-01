import React, { Component } from 'react';

export default class Pothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      description: null,
      rating: null,
      location: null,
      comment: null,
      progress: null,
    };
    this.setComment = this.setComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }
  // needs state because commenting will effect this component
  // this probably doesnt need items in props on state (image, description, rating, location, progress?)

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
        <img src={image} alt="pothole_image" />

        <p>
          Description:
          {description}
          <br />
          <br />
          Location:
          {location}
        </p>

        <p>
          Rating:
          {rating}
        </p>

        <button type="button" onClick={this.handleDonation}>Donate Here</button>
        <br />
        <br />
        <form>
          <textarea rows="4" cols="50" name="comment" onChange={this.setComment} placeholder="Comment here..." />
          <button type="submit" onClick={this.submitComment}>Send Comment</button>
        </form>
      </div>
    );
  }
}
