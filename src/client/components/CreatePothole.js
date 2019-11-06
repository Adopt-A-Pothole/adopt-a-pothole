import React, { Component } from 'react';
import Rating from 'react-rating';
import axios from 'axios';
import { Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UploadPothole from './UploadPothole';


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
        <Card className="ui centered card">
          <Card.Content>
            <Card.Header>
              Report a Pothole
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Button>
              Get Current Location
            </Button>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              Please Rate Severity of Pothole
            </Card.Description>
            <Rating
              stop={3}
              placeholderRating={severity}
              onClick={handleRating}
            />
            <Card.Meta>
              1 being small, 3 being BIG
            </Card.Meta>
          </Card.Content>
          <Card.Content>
            <UploadPothole />
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green" onClick={handleSubmit}>
                Submit
              </Button>
              <Button as={Link} to="/" basic color="red">
                Cancel
              </Button>
            </div>
          </Card.Content>
        </Card>
        <h1> Report A Pothole </h1>
        <h3>Please rate severity of pothole</h3>
        <h4>(1 being small, 3 being BIG)</h4>

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
