import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

export default class UploadPothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
    };

    this.uploadWidget = this.uploadWidget.bind(this);
  }

  componentDidMount() {
    axios.get('https://res.cloudinary.com/adopt-a-pothole/image/upload/sample.jpg')
      .then((res) => {
        console.log(res.data.resources);
        this.setState({
          gallery: res.data.resources
        });
      });
  }

  uploadWidget() {
    cloudinary.openUploadWidget({ cloud_name: 'adopt-a-pothole', upload_preset: 'jdsupaox', tags: ['adopt-a-pothole'] },
      (error, result) => {
        console.log(result);
      });
  }

  render() {
    return (
      <div className="uploadpothole">
        <h5>Upload A Pothole</h5>
        <div className="upload">
          <button type="button" onClick={this.uploadWidget} className="upload-button">
            Add Image
          </button>
        </div>
      </div>
    );
  }
}
