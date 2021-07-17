import PropTypes from 'prop-types';
import React from 'react';

import './BasicInfo.css';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fieldName: props.name };
  }

  componentDidUpdate(prevProps) {
    const { name } = this.props;
    const { fieldName } = this.state;

    if (name !== prevProps.name) {
      if (fieldName.trim() !== name) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ fieldName: name });
      }
    }
  }

  updateName(newName) {
    const { extension, onChange } = this.props;
    this.setState({ fieldName: newName });
    onChange(newName, extension);
  }

  render() {
    const { name, extension, onChange } = this.props;
    const { fieldName } = this.state;

    return (
      <div className="Basic-info">
        <label
          htmlFor="file-name"
          className="Name"
        >
          <span>Name</span>
          <input
            id="file-name"
            type="text"
            value={fieldName}
            onChange={(event) => this.updateName(event.target.value)}
          />
        </label>

        <label
          htmlFor="file-extension"
          className="Extension"
        >
          <span>Extension</span>
          <input
            id="file-extension"
            type="text"
            value={extension}
            onChange={(event) => onChange(name, event.target.value)}
          />
        </label>
      </div>
    );
  }
}

BasicInfo.propTypes = {
  name: PropTypes.string,
  extension: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

BasicInfo.defaultProps = {
  name: '',
  extension: '',
};

export default BasicInfo;
