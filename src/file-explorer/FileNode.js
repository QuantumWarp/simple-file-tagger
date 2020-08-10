import React from 'react';
import './FileNode.css';
import { FaFolder, FaImage, FaFile, FaArrowUp, FaQuestion } from 'react-icons/fa';
import FileHelper from '../helper/file-helper';

class FileNode extends React.Component {
  get symbol() {
    const info = FileHelper.getInfo(this.props.nodeData);
    let symbol = null;
    symbol = (info.isFile && 'file') || symbol;
    symbol = (info.isImage && 'image') || symbol;
    symbol = (info.isDirectory && 'directory') || symbol;
    symbol = (info.isUp && 'up') || symbol;
    return symbol;
  }

  render() {
    return <div
      className={`File-node ${this.props.selected ? 'Selected' : ''}`}
      title={this.props.nodeData.name}
      onClick={this.props.onClick}
    >
      <span className="Icon">
        {!this.symbol && <FaQuestion />}
        {this.symbol === 'file' && <FaFile />}
        {this.symbol === 'image' && <FaImage />}
        {this.symbol === 'directory' && <FaFolder />}
        {this.symbol === 'up' && <FaArrowUp />}
      </span>

      <span>{this.props.nodeData.name}</span>
    </div>;
  }
}

export default FileNode;
