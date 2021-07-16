import React from 'react';
import PropTypes from 'prop-types';
import TagDatePicker from './TagDatePicker';
import TagList from './TagList';
import FileHelper from '../helper/file-helper';
import BasicInfo from './BasicInfo';
import './FileEditor.css';

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
    const {
      name, dateTag, tags, extension,
    } = this.state;
    return (
      <>
        <article className="Basic-info-article">
          <h2>Basic Info</h2>
          <BasicInfo
            name={name}
            extension={extension}
            onChange={(nameUpdate, extensionUpdate) => this.setState({
              name: nameUpdate, extension: extensionUpdate,
            })}
          />

          <TagDatePicker
            value={dateTag}
            onChange={(dateTagUpdate) => this.setState({ dateTag: dateTagUpdate })}
          />
        </article>

        <article>
          <h2>Tagging</h2>
          <TagList
            tags={tags}
            onTagsChange={(tagsUpdate) => this.setState({ tags: tagsUpdate })}
          />
        </article>
      </>
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
