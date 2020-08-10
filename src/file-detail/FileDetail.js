import React from 'react';
import './FileDetail.css';
import FileHelper from '../helper/file-helper';
const electron = window.require('electron');
const fs = electron.remote.require('fs');

class FileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageData: null, imageDataError: false };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path || prevProps.filename !== this.props.filename) {
      if (!this.props.filename || !FileHelper.isImage(this.props.filename)) {
        this.clearImageData();
      } else {
        fs.readFile(this.props.path + '/' + this.props.filename, (err, data) => {
          if (data) {
            this.setState({
              imageData: `data:image/${FileHelper.getExtension(this.props.filename)};base64,${data.toString('base64')}`,
              imageDataError: false,
            });
          } else {
            this.clearImageData();
          }
        })
      }
    }
  }

  clearImageData() {
    this.setState({ imageData: null, imageDataError: false });
  }

  render() {
    return <div className="File-detail">
      {!this.props.filename && <div className="Message">No file selected</div>}
      {!this.state.imageData && this.props.filename && <div className="Message">No preview available</div>}
      {this.state.imageData && this.state.imageDataError && <div className="Message">Preview failed</div>}
      {this.state.imageData && !this.state.imageDataError && <img src={this.state.imageData} onError={() => this.setState({ imageDataError: true })} alt="" />}
    </div>;
  }
}

export default FileDetail;
