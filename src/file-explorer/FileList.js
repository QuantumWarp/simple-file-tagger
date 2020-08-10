import React from 'react';
import './FileList.css';
import FileNode from './FileNode';
import InfiniteScroll from 'react-infinite-scroller';

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { limit: 20 };
  }

  get limitedList() {
     return this.props.files.slice(0, this.state.limit);
  }

  componentDidUpdate(prevProps) {
    if (this.props.files !== prevProps.files) {
      this.setState({ limit: 40 });
    }
  }

  render() {
    return <div className="File-list">
      <InfiniteScroll
        pageStart={0}
        loadMore={() => { this.setState({ limit: this.state.limit + 20 }); }}
        hasMore={this.limitedList.length !== this.props.files.length}
        useWindow={false}
      >
        {this.limitedList.map(
          (x, index) => <FileNode
            key={x.name}
            selected={x.name === this.props.filename}
            nodeData={x}
            onClick={() => this.props.onLocationSelected(`${this.props.path}/${x.name}`)}
            speed={index > 40}
          />
        )}
      </InfiniteScroll>
    </div>;
  }
}

export default FileList;
