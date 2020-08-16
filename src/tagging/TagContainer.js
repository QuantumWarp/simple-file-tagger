import React from 'react';
import PropTypes from 'prop-types';
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
    const { path, filename, onFilenameChange } = this.props;
    const {
      name, dateTag, tags, extension,
    } = this.state;

    if (!this.externalUpdate
      && (name !== prevState.name
      || dateTag !== prevState.dateTag
      || tags.length !== prevState.tags.length
      || extension !== prevState.extension)
    ) {
      const newFilename = FileHelper.createFilename(this.state);
      onFilenameChange(newFilename);
    }

    this.externalUpdate = false;

    if (Boolean(filename)
      && (path !== prevProps.path
      || filename !== prevProps.filename)
    ) {
      const parsedFile = FileHelper.parseFilename(filename);
      this.externalUpdate = true;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        ...parsedFile,
        name: name.trim() === parsedFile.name.trim() ? name : parsedFile.name,
      });
    }
  }

  render() {
    const { filename } = this.props;
    const {
      name, dateTag, tags, extension,
    } = this.state;
    return (
      <div className="Tag-container">
        {!filename && <div className="Message">No file selected</div>}
        {filename && (
          <>
            <div className="Tag-file-info">
              <label
                htmlFor="file-name"
                className="Name"
              >
                Name
                <input
                  id="file-name"
                  type="text"
                  value={name}
                  onChange={(event) => this.setState({ name: event.target.value })}
                />
              </label>

              <label
                htmlFor="file-extension"
                className="Extension"
              >
                Extension
                <input
                  id="file-extension"
                  type="text"
                  value={extension}
                  onChange={(event) => this.setState({ extension: event.target.value })}
                />
              </label>
            </div>

            <TagDatePicker
              value={dateTag}
              onChange={(dateTagUpdate) => this.setState({ dateTag: dateTagUpdate })}
            />

            <TagList
              tags={tags}
              onTagsChange={(tagsUpdate) => this.setState({ tags: tagsUpdate })}
            />
          </>
        )}
      </div>
    );
  }
}

TagContainer.propTypes = {
  path: PropTypes.string,
  filename: PropTypes.string,
  onFilenameChange: PropTypes.func.isRequired,
};

TagContainer.defaultProps = {
  path: '',
  filename: '',
};

export default TagContainer;
