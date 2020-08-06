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
      dateTag: '',
      tags: [],
      extension: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.intialUpdate
      && (this.state.name !== prevState.name
      || this.state.dateTag !== prevState.dateTag
      || this.state.tags.length !== prevState.tags.length
      || this.state.extension !== prevState.extension)
    ) {
      const newFilename = FileHelper.createFilename(this.state);
      this.props.onFilenameChange(newFilename);
    }

    this.intialUpdate = false;

    if (this.props.path !== prevProps.path
      || this.props.filename !== prevProps.filename
    ) {
      if (this.props.filename) {
        const parsedFile = FileHelper.parseFilename(this.props.filename);
        this.intialUpdate = true;
        this.setState(parsedFile);
      }
    }
  }

  render() {
    return <div className="Tag-container">
      <input
        value={this.state.name}
        onChange={(event) => this.setState({ name: event.target.value })}
      />

      <input
        value={this.state.extension}
        onChange={(event) => this.setState({ extension: event.target.value })}
      />

      <TagDatePicker
        value={this.state.dateTag}
        onChange={(dateTag) => this.setState({ dateTag })}
      />

      <TagList
        tags={this.state.tags}
        onTagsChange={(tags) => this.setState({ tags })}
      />
    </div>;
  }
}

export default TagContainer;
