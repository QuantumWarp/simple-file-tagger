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

  get info() {
    return FileHelper.getInfo(this.props.filePath);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filePath !== prevProps.filePath) {
      fs.readFile(this.props.filePath, (err, data) => {
        this.setState({
          imageData: `data:image/${FileHelper.getExtension(this.props.filePath)};base64,${data.toString('base64')}`
        });
      })
    }
  }

  render() {
    return <div className="File-detail">
      <div>File Detail</div>
      <div>{this.props.file}</div>
      <img src={this.state.imageData} alt="File" />
    </div>;
  }
}

export default FileDetail;
