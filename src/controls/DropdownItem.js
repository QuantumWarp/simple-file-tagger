import React from 'react';
import PropTypes from 'prop-types';

import './Dropdown.css';

const DropdownItem = (props) => {
  const { children, onClick } = props;

  return (
    <button
      type="button"
      className="Dropdown-item"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

DropdownItem.defaultProps = {
  onClick: () => {},
};

export default DropdownItem;
