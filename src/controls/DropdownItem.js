import React from 'react';
import './Dropdown.css';

class DropdownItem extends React.Component {
  render() {
    return <div
      className="Dropdown-item"
      onClick={this.props.onClick}
    >
      {this.props.children}
    </div>;
  }
}

export default DropdownItem;
