import React, { Component } from 'react';
import Rating from 'react-rating';
import axios from 'axios';
import {
  Button,
  Card,
  Form,
  TextArea,
  Input,
  Loader
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UploadPothole from './UploadPothole';

export default class CreatePothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      location: null,
      severity: 0,
      description: null,
      image: null,
      loader: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  // check if user authorized
  componentDidMount() {
    axios.get('/authorized')
      .then((res) => {
        // redirect to login if false
        if (!res.data) {
          window.location.href = 'http://localhost:8080/auth/google';
        }
      });
  }

  // get User Location
  // eslint-disable-next-line class-methods-use-this
  getLocation() {
    this.setState({
      loader: <Loader active inline="centered" />
    });
    // ask server to request lat/long from google
    axios.get('/location')
      .then((res) => {
        const { lat, lng } = res.data;
        // update state
        this.setState({
          location: {
            latitude: lat,
            longitude: lng
          }
        });
      });
  }

  // handle form submit
  handleSubmit() {
    const pothole = this.state;
    // send post request to /potholes
    axios.post('/potholes', { pothole })
      .then(() => {
        // TODO Message success
        this.props.history.push('/');
      });
  }

  // handle title change
  handleTitle(event) {
    const title = event.target.value;
    this.setState({
      title,
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
    this.setState({
      image,
    });
  }

  render() {
    const {
      handleSubmit,
      handleTitle,
      handleDescription,
      handleImage,
      handleRating,
      getLocation
    } = this;
    const { severity, location, loader } = this.state;
    return (
      <div>
        <Card className="ui centered card">
          <Card.Content>
            <Card.Header>
              Report a Pothole
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Input onChange={handleTitle} placeholder="Name Your Pothole" />
          </Card.Content>
          <Card.Content>
            {location ?
              (
                <div>
                  <p>Longitude: {location.longitude}</p>
                  <p>Latitude: {location.latitude}</p>
                </div>
              )
              : (
                <div>
                  <Button onClick={getLocation}>
                    Get Current Location
                  </Button>
                  {loader}
                </div>
              )}
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
