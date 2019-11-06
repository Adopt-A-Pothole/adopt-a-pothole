import React, { Component } from 'react';
import { Button, Image } from 'semantic-ui-react';

export default class UploadPothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
    };
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  uploadWidget() {
    // eslint-disable-next-line no-undef
    cloudinary.openUploadWidget({ cloud_name: 'adopt-a-pothole', upload_preset: 'jdsupaox', tags: ['adopt-a-pothole'] },
      (error, result) => {
        const url = result[0].secure_url;
        // render photo
        this.setState({ url });
        // call function to pass url to parent
        this.props.success(url);
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
