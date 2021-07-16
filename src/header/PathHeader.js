import PropTypes from 'prop-types';
import React from 'react';

import './PathHeader.css';
import Dropdown from '../controls/Dropdown';

class PathHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false };
  }

  get driveSegment() {
    const { disks } = this.props;
    return disks.find((x) => x === this.segments[0]);
  }

  get otherSegments() {
    return this.driveSegment ? this.segments.slice(1) : this.segments;
  }

  get segments() {
    const { path } = this.props;
    return path.split('/').filter((x) => Boolean(x));
  }

  segmentSelected(index) {
    const { onPathChange } = this.props;
    const joined = this.segments.slice(0, index + 2).join('/');
    onPathChange(`${joined}`);
  }

  render() {
    const { disks, onPathChange } = this.props;
    const { dropdownOpen } = this.state;
    return (
      <div className="Path-header">
        <Dropdown
          open={dropdownOpen}
          onClose={() => this.setState({ dropdownOpen: false })}
        >
          {disks.map((x) => (
            <Dropdown.Item
              key={x}
              onClick={() => onPathChange(`${x}/`)}
            >
              <span className="Path-header-disk">{x}</span>
            </Dropdown.Item>
          ))}
        </Dropdown>

        <div className="Path-header-inner">
          {this.driveSegment && (
            <button
              type="button"
              onClick={() => this.setState({ dropdownOpen: !dropdownOpen })}
            >
              <span className="Segment" title="Change Drive">{this.driveSegment}</span>
              /
            </button>
          )}

          {this.otherSegments.map((x, index) => (
            <span
              className="Segment-container"
              // eslint-disable-next-line react/no-array-index-key
              key={`${x}/${index}`}
            >
              <button
                type="button"
                className="Segment"
                onClick={() => this.segmentSelected(index)}
              >
                {x}
              </button>
              /
            </span>
          ))}
        </div>
      </div>
    );
  }
}

PathHeader.propTypes = {
  disks: PropTypes.arrayOf(PropTypes.string),
  path: PropTypes.string,
  onPathChange: PropTypes.func.isRequired,
};

PathHeader.defaultProps = {
  disks: [],
  path: '',
};

export default PathHeader;
