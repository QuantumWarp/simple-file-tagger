import React from 'react';
import './FileList.css';
import FileNode from './FileNode';
const electron = window.require('electron');
const fs = electron.remote.require('fs');

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps) {
    if (this.props.directory !== prevProps.directory) {
      this.loadFiles();
    }
  }

  loadFiles() {
    fs.readdir(
      this.props.directory,
      { withFileTypes: true },
      (err, files) => {
        files = [{ name: '..' }].concat(files);
        this.setState({ files });
      });
  }

  render() {
    return <div className="File-list">
      {this.state.files.map(
        (x) => <FileNode
          key={x.name}
          nodeData={x}
          onClick={() => this.props.selectEntry(x.name)}
        />
      )}
    </div>;
  }
}

export default FileList;
