import PropTypes from 'prop-types';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import './FileList.css';
import FileNode from './FileNode';

class FileList extends React.Component {
  rootEl = React.createRef();

  constructor(props) {
    super(props);

    this.state = { limit: 0 };
    this.boundSetMinLimit = this.setMinLimit.bind(this);
  }

  componentDidMount() {
    this.setMinLimit();
    window.addEventListener('resize', this.boundSetMinLimit);
  }

  componentDidUpdate(prevProps) {
    const { path } = this.props;

    if (path !== prevProps.path) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ limit: this.minLimit });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.boundSetMinLimit);
  }

  get minLimit() {
    const height = this.rootEl.current.clientHeight;
    const fitNumber = height / 20;
    return fitNumber + 10;
  }

  get limitedList() {
    const { files } = this.props;
    const { limit } = this.state;
    return files.slice(0, limit);
  }

  setMinLimit() {
    const { limit } = this.state;

    if (limit < this.minLimit) {
      this.setState({ limit: this.minLimit });
    }
  }

  render() {
    const {
      files, filename, path, onLocationSelected,
    } = this.props;
    const { limit } = this.state;

    return (
      <div
        ref={this.rootEl}
        className="File-list"
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={() => { this.setState({ limit: limit + 20 }); }}
          hasMore={this.limitedList.length !== files.length}
          useWindow={false}
        >
          {this.limitedList.map(
            (x) => (
              <FileNode
                key={`${path}/${x.name}`}
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
