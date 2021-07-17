import PropTypes from 'prop-types';
import React from 'react';
import {
  FaFolder, FaImage, FaFile, FaArrowUp, FaQuestion,
} from 'react-icons/fa';

import './FileNode.css';
import FileHelper from '../helper/file-helper';

class FileNode extends React.Component {
  rootEl = React.createRef();

  shouldComponentUpdate(nextProps) {
    const { nodeData, selected, onClick } = this.props;
    const newNodeData = nextProps.nodeData;
    return (nodeData && nodeData.name) !== (newNodeData && newNodeData.name)
      || selected !== nextProps.selected
      || onClick !== nextProps.onClick;
  }

  componentDidUpdate() {
    const { selected } = this.props;

    if (selected) {
      this.rootEl.current.scrollIntoView({ block: 'nearest' });
    }
  }

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
        ref={this.rootEl}
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
