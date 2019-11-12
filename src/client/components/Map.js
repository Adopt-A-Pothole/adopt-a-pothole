import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
    this.displayMarkers = this.displayMarkers.bind(this);
  }

  componentDidMount() {
    axios.get('/potholes')
      .then((response) => {
        this.setState({
          locations: response.data.map((pothole) => {
            return { latitude: pothole.latitude, longitude: pothole.longitude };
          }),
        });
      })
      .then(() => this.displayMarkers());
  }

  displayMarkers() {
    const { locations } = this.state;
    return (locations.map((location, index) => (
      <Marker key={index} id={index} position={{
        lat: location.latitude,
        lng: location.longitude
      }}
        onClick={() => console.log('You clicked me!')}
      />
    ))
    );
  }

  render() {
    const style = {
      width: 'flex',
      height: 'flex',
      align: 'center',
    };
    const { google } = this.props;

    return (
      <Map
        google={google}
        zoom={8}
        style={style}
        initialCenter={{ lat: 29.951065, lng: -90.071533 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.google_key
})(MapContainer);
