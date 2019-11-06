import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';


export default class UploadPothole extends Component {
  constructor() {
    super();
    this.uploadWidget = this.uploadWidget.bind(this);
  }


  // eslint-disable-next-line class-methods-use-this
  uploadWidget() {
    // eslint-disable-next-line no-undef
    cloudinary.openUploadWidget({ cloud_name: 'adopt-a-pothole', upload_preset: 'jdsupaox', tags: ['adopt-a-pothole'] },
      (error, result) => {
        console.log(result[0].secure_url);
      });
  }

  render() {
    return (
      <div className="uploadpothole">
        <div className="upload">
          <Button onClick={this.uploadWidget} className="upload-button">
            Add Image
          </Button>
        </div>
      </div>
    );
  }
}
