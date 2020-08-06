import React from 'react';
import './FileExplorer.css';
import FileList from './FileList';

class FileExplorer extends React.Component {
  render() {
    return <div className="File-explorer">
      <FileList
        path={this.props.path}
        filename={this.props.filename}
        selectLocation={(fullPath) => this.props.selectLocation(fullPath)}
      />
    </div>;
  }
}

export default FileExplorer;
