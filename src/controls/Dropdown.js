import React from 'react';
import './Dropdown.css';
import DropdownItem from './DropdownItem';

class Dropdown extends React.Component {
  static Item = DropdownItem;

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.boundClickHandler = this.clickHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      document.addEventListener('click', this.boundClickHandler);
    } else if (prevProps.open && !this.props.open) {
      document.removeEventListener('click', this.boundClickHandler);
    }
  }

  clickHandler(event) {
    const clickedInside = this.myRef.current.contains(event.target);
    this.props.onClose({ clickedInside });
  }

  render() {
    return <div ref={this.myRef} className={`Dropdown ${this.props.open && 'open'}`}>
      <div className="Dropdown-inner">
        {this.props.children}
      </div>
    </div>;
  }
}

export default Dropdown;
