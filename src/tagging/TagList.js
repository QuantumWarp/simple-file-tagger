import React from 'react';
import './TagList.css';
import { FaTrash } from 'react-icons/fa';

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTagInput: '',
      tagOptions: [],
    };
  }

  componentDidMount() {
    const tagOptions = localStorage.getItem('tagOptions');
    if (tagOptions) {
      this.setState({ tagOptions: JSON.parse(tagOptions) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.tagOptions.length !== prevState.tagOptions.length) {
      localStorage.setItem('tagOptions', JSON.stringify(this.state.tagOptions));
    }

    const newTagOptions = this.state.tagOptions
      .concat(this.props.tags)
      .filter((x, index, self) => self.indexOf(x) === index);
    if (newTagOptions.length !== this.state.tagOptions.length) {
      this.setState({ tagOptions: newTagOptions });
    }
  }

  addTag() {
    if (!this.state.tagOptions.includes(this.state.newTagInput)) {
      const newTagOptions = this.state.tagOptions.concat([this.state.newTagInput]);
      this.setState({ tagOptions: newTagOptions });
      this.updateTagChecked(this.state.newTagInput, true);
    }

    this.setState({ newTagInput: '' });
  }

  removeTag(tag) {
    this.updateTagChecked(tag, false);
    const newTagOptions = this.state.tagOptions.filter((x) => x !== tag);
    this.setState({ tagOptions: newTagOptions });
  }

  updateTagChecked(tag, checked) {
    if (checked && !this.props.tags.includes(tag)) {
      const newTags = this.props.tags.concat([tag]);
      this.props.onTagsChange(newTags);
    } else {
      const newTags = this.props.tags.filter((x) => x !== tag);
      this.props.onTagsChange(newTags);
    }
  }

  render() {
    return <div className="Tag-list"> 
      <label>Tag List</label>
      <div className="Tag-add">
        <input
          type="text"
          value={this.state.newTagInput}
          onChange={(event) => this.setState({ newTagInput: event.target.value })}
        />
        <button className="clicky" onClick={() => this.addTag()}>Add Tag</button>
      </div>

      <div className="List">
        {this.state.tagOptions.sort().map((x) => <div
          className="Tag"
          key={x}
        >
          <label className="checkbox">
            {x}
            <input
              type="checkbox"
              checked={this.props.tags.includes(x)}
              onChange={(event) => this.updateTagChecked(x, event.target.value)}
            />
            <div className="box"></div>
          </label>
          <button><FaTrash onClick={() => this.removeTag(x)}>Remove</FaTrash></button>
        </div>)}
      </div>
    </div>;
  }
}

export default TagList;
