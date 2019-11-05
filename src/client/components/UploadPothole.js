import React, { Component } from 'react';
import axios from 'axios';
// import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

export default class UploadPothole extends Component {
  constructor() {
    super();
    this.uploadWidget = this.uploadWidget.bind(this);
  }


  uploadWidget() {
    cloudinary.openUploadWidget({ cloud_name: 'adopt-a-pothole', upload_preset: 'jdsupaox', tags: ['adopt-a-pothole'] },
      (error, result) => {
        console.log(result[0].secure_url);
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
