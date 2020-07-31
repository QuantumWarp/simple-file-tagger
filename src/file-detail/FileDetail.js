import React from 'react';
import './FileDetail.css';
import FileHelper from '../helper/file-helper';
const electron = window.require('electron');
const fs = electron.remote.require('fs');

class FileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageData: null };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filename && !this.props.filename) {
      this.setState({ imageData: null });
    } else if (prevProps.filename !== this.props.filename) {
      fs.readFile(this.props.path + this.props.filename, (err, data) => {
        this.setState({
          imageData: `data:image/${FileHelper.getExtension(this.props.filename)};base64,${data.toString('base64')}`
        });
      })
    }
  }

  render() {
    return <div className="File-detail">
      <div>File Detail</div>
      <div>{this.props.filename}</div>
      <img src={this.state.imageData} alt="File" />
    </div>;
  }
}

export default FileDetail;
