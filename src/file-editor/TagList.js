import PropTypes from 'prop-types';
import React from 'react';
import { FaTrash } from 'react-icons/fa';

import './TagList.css';

const electron = window.require('electron');
const Store = electron.remote.require('electron-store');

class TagList extends React.Component {
  constructor(props) {
    super(props);

    this.store = new Store();
    this.state = {
      newTagInput: '',
      tagOptions: [],
    };
  }

  componentDidMount() {
    const tagOptions = this.store.get('tagOptions');

    if (tagOptions) {
      this.setState({ tagOptions });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    const { tags } = this.props;
    const { tagOptions } = this.state;

    if (tagOptions.length !== prevState.tagOptions.length) {
      this.store.set('tagOptions', tagOptions);
    }

    const newTagOptions = tagOptions
      .concat(tags)
      .filter((x, index, self) => self.indexOf(x) === index);
    if (newTagOptions.length !== tagOptions.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ tagOptions: newTagOptions });
    }
  }

  addTag() {
    const { tagOptions, newTagInput } = this.state;
    const trimmedTag = newTagInput.trim();

    if (tagOptions.includes(trimmedTag)) {
      this.updateTagChecked(trimmedTag, true);
    } else {
      const newTagOptions = tagOptions.concat([trimmedTag]);
      this.setState({ tagOptions: newTagOptions });
      this.updateTagChecked(newTagInput, true);
    }

    this.setState({ newTagInput: '' });
  }

  removeTag(tag) {
    const { tagOptions } = this.state;

    this.updateTagChecked(tag, false);
    const newTagOptions = tagOptions.filter((x) => x !== tag);
    this.setState({ tagOptions: newTagOptions });
  }

  updateTagChecked(tag, checked) {
    const { tags, onTagsChange } = this.props;

    if (checked && !tags.includes(tag)) {
      const newTags = tags.concat([tag]);
      onTagsChange(newTags);
    } else {
      const newTags = tags.filter((x) => x !== tag);
      onTagsChange(newTags);
    }
  }

  render() {
    const { tags } = this.props;
    const { tagOptions, newTagInput } = this.state;

    return (
      <div className="Tag-list">
        <div className="Tag-add">
          <input
            type="text"
            value={newTagInput}
            onChange={(event) => this.setState({ newTagInput: event.target.value })}
          />
          <button
            type="button"
            className="clicky"
            onClick={() => this.addTag()}
          >
            Add Tag
          </button>
        </div>

        <div className="List">
          {tagOptions
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .map((x) => (
              <div
                className="Tag"
                key={x}
              >
                <label
                  htmlFor={`tag-${x}`}
                  className="checkbox"
                >
                  <input
                    id={`tag-${x}`}
                    type="checkbox"
                    checked={tags.includes(x)}
                    onChange={(event) => this.updateTagChecked(x, event.target.value)}
                  />
                  <div className="box" />
                  {x}
                </label>

                <button
                  type="button"
                  className="Remove"
                  title="Remove"
                  onClick={() => this.removeTag(x)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onTagsChange: PropTypes.func.isRequired,
};

TagList.defaultProps = {
  tags: [],
};

export default TagList;
