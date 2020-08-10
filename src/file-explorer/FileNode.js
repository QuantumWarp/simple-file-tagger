import React from 'react';
import PropTypes from 'prop-types';
import './FileNode.css';
import {
  FaFolder, FaImage, FaFile, FaArrowUp, FaQuestion,
} from 'react-icons/fa';
import FileHelper from '../helper/file-helper';

class FileNode extends React.Component {
  get symbol() {
    const { nodeData } = this.props;
    const info = FileHelper.getInfo(nodeData);
    let symbol = null;
    symbol = (info.isFile && 'file') || symbol;
    symbol = (info.isImage && 'image') || symbol;
    symbol = (info.isDirectory && 'directory') || symbol;
    symbol = (info.isUp && 'up') || symbol;
    return symbol;
  }

  render() {
    const { nodeData, selected, onClick } = this.props;
    return (
      <button
        type="button"
        className={`File-node ${selected ? 'Selected' : ''}`}
        title={nodeData.name}
        onClick={onClick}
      >
        <span className="Icon">
          {!this.symbol && <FaQuestion />}
          {this.symbol === 'file' && <FaFile />}
          {this.symbol === 'image' && <FaImage />}
          {this.symbol === 'directory' && <FaFolder />}
          {this.symbol === 'up' && <FaArrowUp />}
        </span>

        <span>{nodeData.name}</span>
      </button>
    );
  }
}

FileNode.propTypes = {
  nodeData: PropTypes.shape().isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

FileNode.defaultProps = {
  selected: false,
  onClick: () => {},
};

export default FileNode;
