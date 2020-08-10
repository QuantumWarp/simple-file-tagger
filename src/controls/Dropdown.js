import React from 'react';
import PropTypes from 'prop-types';
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
    const { open } = this.props;
    if (!prevProps.open && open) {
      document.addEventListener('click', this.boundClickHandler);
    } else if (prevProps.open && !open) {
      document.removeEventListener('click', this.boundClickHandler);
    }
  }

  clickHandler(event) {
    const { onClose } = this.props;
    const clickedInside = this.myRef.current.contains(event.target);
    onClose({ clickedInside });
  }

  render() {
    const { open, children } = this.props;
    return (
      <div ref={this.myRef} className={`Dropdown ${open && 'open'}`}>
        <div className="Dropdown-inner">
          {children}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

Dropdown.defaultProps = {
  onClose: () => {},
};

export default Dropdown;
