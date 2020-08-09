import React from 'react';
import './Dropdown.css';
import DropdownItem from './DropdownItem';

class Dropdown extends React.Component {
  static Item = DropdownItem;

  render() {
    return <div className={`Dropdown ${this.props.open && 'open'}`}>
      <div className="Dropdown-inner">
        {this.props.children}
      </div>
    </div>;
  }
}

export default Dropdown;
