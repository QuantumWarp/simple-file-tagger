import React from 'react';
import './TagList.css';

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTagInput: '',
      tagOptions: [
        'tag1',
        'tag2',
      ],
    };
  }

  componentDidUpdate() {
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
    }

    this.setState({ newTagInput: '' });
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
      <input
        value={this.state.newTagInput}
        onChange={(event) => this.setState({ newTagInput: event.target.value })}
      />
      <button onClick={() => this.addTag()}>Add Tag</button>

      {this.state.tagOptions.map((x) => <div key={x}>
        {x}
        <input
          type="checkbox"
          checked={this.props.tags.includes(x)}
          onChange={(event) => this.updateTagChecked(x, event.target.value)}
        />
      </div>)}
    </div>;
  }
}

export default TagList;
