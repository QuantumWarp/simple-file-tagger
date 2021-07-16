import PropTypes from 'prop-types';
import React from 'react';

import './BasicInfo.css';

const BasicInfo = (props) => {
  const { name, extension, onChange } = props;

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
};

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
