import React from 'react';
import './TagContainer.css';
import TagDatePicker from './TagDatePicker';
import TagList from './TagList';
import FileHelper from '../helper/file-helper';

class TagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      tags: [],
      extension: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path || this.props.filename !== prevProps.filename) {
      if (this.props.filename) {
        this.setState(FileHelper.parseTags(this.props.filename));
      }
    }
  }

  render() {
    return <div className="Tag-container">
      {FileHelper.createFilename(this.state)}

      <input
        value={this.state.name}
        onChange={(event) => this.setState({ name: event.target.value })}
      />

      <input
        value={this.state.extension}
        onChange={(event) => this.setState({ extension: event.target.value })}
      />

      <TagDatePicker
        value={this.state.date}
        onChange={(date) => this.setState({ date })}
      />

      <TagList
        tags={this.state.tags}
        onTagsChange={(tags) => this.setState({ tags })}
      />
    </div>;
  }
}

export default TagContainer;
