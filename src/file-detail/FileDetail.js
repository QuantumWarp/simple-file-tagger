import React from 'react';
import PropTypes from 'prop-types';
import './FileDetail.css';
import FileHelper from '../helper/file-helper';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

class FileDetail extends React.Component {
  root = React.createRef();

  defaultState = { imageData: null, imageDataError: false, zoom: 100 };

  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
    this.boundZoomHandler = this.zoomHandler.bind(this);
  }

  componentDidMount() {
    this.root.current.addEventListener('wheel', this.boundZoomHandler);
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
              zoom: 100,
            });
          } else {
            this.clearImageData();
          }
        });
      }
    }
  }

  componentWillUnmount() {
    this.root.current.removeEventListener('wheel', this.boundZoomHandler);
  }

  zoomHandler(event) {
    if (!event.ctrlKey) return;
    const { zoom } = this.state;
    const amount = -event.deltaY / 10;
    let newZoom = zoom + amount;
    if (newZoom >= 400) newZoom = 400;
    if (newZoom <= 100) newZoom = 100;
    this.setState({ zoom: newZoom });
  }

  clearImageData() {
    this.setState({ ...this.defaultState });
  }

  render() {
    const { filename } = this.props;
    const { imageData, imageDataError, zoom } = this.state;
    return (
      <div
        ref={this.root}
        className="File-detail"
      >
        {!filename && <div className="Message">No file selected</div>}
        {!imageData && filename && <div className="Message">No preview available</div>}
        {imageData && imageDataError && <div className="Message">Preview failed</div>}
        {imageData && !imageDataError && (
          <img
            style={{ width: `${zoom}%` }}
            src={imageData}
            onError={() => this.setState({ imageDataError: true })}
            alt=""
          />
        )}
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
