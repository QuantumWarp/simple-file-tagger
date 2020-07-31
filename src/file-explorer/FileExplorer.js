import React from 'react';
import './FileExplorer.css';
import DirectoryPath from './DirectoryPath';
import FileList from './FileList';

class FileExplorer extends React.Component {
  render() {
    return <div className="File-explorer">
      <DirectoryPath directory={this.props.selectedDir} />
      <FileList
        selectEntry={(entry) => this.props.selectPath(`${this.props.selectedDir}/${entry}`)}
        directory={this.props.selectedDir}
      />
    </div>;
  }
}

export default FileExplorer;
