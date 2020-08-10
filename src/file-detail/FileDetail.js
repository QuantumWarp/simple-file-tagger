import React from 'react';
import PropTypes from 'prop-types';
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
    const { path, filename } = this.props;
    if (prevProps.path !== path || prevProps.filename !== filename) {
      if (!filename || !FileHelper.isImage(filename)) {
        this.clearImageData();
      } else {
        fs.readFile(`${path}/${filename}`, (err, data) => {
          if (data) {
            this.setState({
              imageData: `data:image/${FileHelper.getExtension(filename)};base64,${data.toString('base64')}`,
              imageDataError: false,
            });
          } else {
            this.clearImageData();
          }
        });
      }
    }
  }

  clearImageData() {
    this.setState({ imageData: null, imageDataError: false });
  }

  render() {
    const { filename } = this.props;
    const { imageData, imageDataError } = this.state;
    return (
      <div className="File-detail">
        {!filename && <div className="Message">No file selected</div>}
        {!imageData && filename && <div className="Message">No preview available</div>}
        {imageData && imageDataError && <div className="Message">Preview failed</div>}
        {imageData && !imageDataError && <img src={imageData} onError={() => this.setState({ imageDataError: true })} alt="" />}
      </div>
    );
  }
}

FileDetail.propTypes = {
  path: PropTypes.string,
  filename: PropTypes.string,
};

FileDetail.defaultProps = {
  path: '',
  filename: '',
};

export default FileDetail;
