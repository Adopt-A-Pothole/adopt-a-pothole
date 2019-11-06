import React, { Component } from 'react';
import Rating from 'react-rating';
import axios from 'axios';
import {
  Button,
  Card,
  Form,
  TextArea,
  Input
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UploadPothole from './UploadPothole';


export default class CreatePothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      severity: 0,
      description: null,
      image: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleImage(url) {
    const image = url;
    debugger;
    this.setState({
      image,
    });
  }

  render() {
    const {
      handleSubmit,
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
            <Input placeholder="Name Your Pothole" />
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
            <UploadPothole success={handleImage} />
          </Card.Content>
          <Card.Content>
            <Form>
              <TextArea onChange={handleDescription} placeholder="Tell us a little more about the pothole" />
            </Form>
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
      </div>
    );
  }
}
