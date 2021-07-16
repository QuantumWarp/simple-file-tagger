import React from 'react';
import PropTypes from 'prop-types';
import './FileDetail.css';
import FileHelper from '../helper/file-helper';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

class FileDetail extends React.Component {
  rootEl = React.createRef();

  zoomEl = React.createRef();

  defaultState = { imageData: null, imageDataError: false, zoom: 1 };

  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
    this.boundZoomHandler = this.zoomHandler.bind(this);
  }

  componentDidMount() {
    this.rootEl.current.addEventListener('wheel', this.boundZoomHandler);
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
              zoom: 1,
            });
          } else {
            this.clearImageData();
          }
        });
      }
    }
  }

  componentWillUnmount() {
    this.rootEl.current.removeEventListener('wheel', this.boundZoomHandler);
  }

  zoomHandler(event) {
    if (!event.ctrlKey) return;
    const { zoom } = this.state;
    const amount = -event.deltaY / 1000;
    let newZoom = zoom + amount;
    if (newZoom >= 4) newZoom = 4;
    if (newZoom <= 1) newZoom = 1;
    this.setState({ zoom: newZoom });

    // Center scroll
    const outerWidth = this.rootEl.current.offsetWidth;
    const innerWidth = this.zoomEl.current.offsetWidth;
    this.rootEl.current.scrollLeft = (innerWidth - outerWidth) / 2;

    const outerHeight = this.rootEl.current.offsetHeight;
    const innerHeight = this.zoomEl.current.offsetHeight;
    this.rootEl.current.scrollTop = (innerHeight - outerHeight) / 2;
  }

  clearImageData() {
    this.setState({ ...this.defaultState });
  }

  render() {
    const { filename } = this.props;
    const { imageData, imageDataError, zoom } = this.state;
    return (
      <div
        ref={this.rootEl}
        className="File-detail"
      >
        <div
          ref={this.zoomEl}
          className="Zoom-container"
          style={{ minWidth: `${zoom * 100}%`, minHeight: `${zoom * 100}%` }}
        >
          {!filename && <div className="Message">No file selected</div>}
          {!imageData && filename && <div className="Message">No preview available</div>}
          {imageData && imageDataError && <div className="Message">Preview failed</div>}
          {imageData && !imageDataError && (
            <img
              src={imageData}
              onError={() => this.setState({ imageDataError: true })}
              alt=""
            />
          )}
        </div>
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
