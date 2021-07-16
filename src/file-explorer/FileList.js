import PropTypes from 'prop-types';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import './FileList.css';
import FileNode from './FileNode';

class FileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { limit: 40 };
  }

  componentDidUpdate(prevProps) {
    const { files } = this.props;

    if (files !== prevProps.files) {
      this.resetLimit();
    }
  }

  get limitedList() {
    const { files } = this.props;
    const { limit } = this.state;
    return files.slice(0, limit);
  }

  resetLimit() {
    this.setState({ limit: 40 });
  }

  render() {
    const {
      files, filename, path, onLocationSelected,
    } = this.props;
    const { limit } = this.state;

    return (
      <div className="File-list">
        <InfiniteScroll
          pageStart={0}
          loadMore={() => { this.setState({ limit: limit + 20 }); }}
          hasMore={this.limitedList.length !== files.length}
          useWindow={false}
        >
          {this.limitedList.map(
            (x) => (
              <FileNode
                key={x.name}
                selected={x.name === filename}
                nodeData={x}
                onClick={() => onLocationSelected(`${path}/${x.name}`)}
              />
            ),
          )}
        </InfiniteScroll>
      </div>
    );
  }
}

FileList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string,
  filename: PropTypes.string,
  onLocationSelected: PropTypes.func.isRequired,
};

FileList.defaultProps = {
  files: [],
  path: '',
  filename: '',
};

export default FileList;
