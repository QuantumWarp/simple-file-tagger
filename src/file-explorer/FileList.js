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
    if (this.props.path !== prevProps.path) {
      this.loadFiles();
    }

    if (this.props.filename !== prevProps.filename
      && this.state.files.find((x) => x.name === prevProps.filename)
    ) {
      console.log('Update')
      const files = [...this.state.files];
      const file = this.state.files.find((x) => x.name === prevProps.filename);
      const index = files.indexOf(file);
      const newFile = {
        ...file,
        name: this.props.filename,
      };
      files[index] = newFile;
      this.setState({ files });
    }
  }

  loadFiles() {
    fs.readdir(
      this.props.path,
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
          selected={x.name === this.props.filename}
          nodeData={x}
          onClick={() => this.props.selectLocation(`${this.props.path}/${x.name}`)}
        />
      )}
    </div>;
  }
}

export default FileList;
