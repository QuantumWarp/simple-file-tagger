import PropTypes from 'prop-types';
import React from 'react';

import './FileEditor.css';
import FileHelper from '../helper/file-helper';
import BasicInfo from './BasicInfo';
import TagDatePicker from './TagDatePicker';
import TagList from './TagList';

class TagContainer extends React.Component {
  get parsedFilename() {
    const { filename } = this.props;
    return FileHelper.parseFilename(filename);
  }

  generateFilename(updatedProps) {
    const newParsedFilename = { ...this.parsedFilename, ...updatedProps };
    const { onFilenameChange } = this.props;
    const newFilename = FileHelper.createFilename(newParsedFilename);
    onFilenameChange(newFilename);
  }

  render() {
    const {
      name, dateTag, tags, extension,
    } = this.parsedFilename;

    return (
      <>
        <article className="Basic-info-article">
          <h2>Basic Info</h2>
          <BasicInfo
            name={name}
            extension={extension}
            onChange={(nameUpdate, extensionUpdate) => this.generateFilename({
              name: nameUpdate, extension: extensionUpdate,
            })}
          />

          <TagDatePicker
            value={dateTag}
            onChange={(dateTagUpdate) => this.generateFilename({ dateTag: dateTagUpdate })}
          />
        </article>

        <article>
          <h2>Tagging</h2>
          <TagList
            tags={tags}
            onTagsChange={(tagsUpdate) => this.generateFilename({ tags: tagsUpdate })}
          />
        </article>
      </>
    );
  }
}

TagContainer.propTypes = {
  filename: PropTypes.string,
  onFilenameChange: PropTypes.func.isRequired,
};

TagContainer.defaultProps = {
  filename: '',
};

export default TagContainer;
