import PropTypes from 'prop-types';
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
    const { align, open, children } = this.props;

    return (
      <div
        ref={this.myRef}
        style={{ [align]: 0 }}
        className={`Dropdown ${open && 'open'}`}
      >
        {children}
      </div>
    );
  }
}

Dropdown.propTypes = {
  align: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

Dropdown.defaultProps = {
  align: 'right',
  onClose: () => {},
};

export default Dropdown;
