import React from 'react';
import './FileList.css';
import FileNode from './FileNode';

class FileList extends React.Component {
  render() {
    return <div className="File-list">
      {this.props.files.map(
        (x) => <FileNode
          key={x.name}
          selected={x.name === this.props.filename}
          nodeData={x}
          onClick={() => this.props.onLocationSelected(`${this.props.path}/${x.name}`)}
        />
      )}
    </div>;
  }
}

export default FileList;
