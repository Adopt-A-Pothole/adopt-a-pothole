import React, { Component } from 'react';
import { Button, Image } from 'semantic-ui-react';
import axios from 'axios';


export default class UploadPothole extends Component {
  constructor() {
    super();
    this.state = {
      url: null,
    };
    this.uploadWidget = this.uploadWidget.bind(this);
  }


  // eslint-disable-next-line class-methods-use-this
  uploadWidget() {
    // eslint-disable-next-line no-undef
    cloudinary.openUploadWidget({ cloud_name: 'adopt-a-pothole', upload_preset: 'jdsupaox', tags: ['adopt-a-pothole'] },
      (error, result) => {
        const url = result[0].secure_url;
        // render photo
        this.setState({ url });
      });
  }

  render() {
    const { url } = this.state;
    return (
      <div className="uploadpothole">
        { url ? (
          <Image src={url} />
        )
          : (
            <div className="upload">
              <Button onClick={this.uploadWidget} className="upload-button">
                Add Image
              </Button>
            </div>
          )}
      </div>
    );
  }
}
