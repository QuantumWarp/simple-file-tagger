import React from 'react';
import PropTypes from 'prop-types';
import './BasicInfo.css';

// eslint-disable-next-line react/prefer-stateless-function
class BasicInfo extends React.Component {
  render() {
    const { name, extension, onChange } = this.props;

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
            value={name}
            onChange={(event) => onChange(event.target.value, extension)}
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
