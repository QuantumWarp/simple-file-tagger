import React from 'react';
import './PathHeader.css';
import Dropdown from '../controls/Dropdown';

class PathHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false };
  }

  get driveSegment() {
    return this.props.disks.find((x) => x === this.segments[0]);
  }

  get otherSegments() {
    return this.driveSegment ? this.segments.slice(1) : this.segments;
  }

  get segments() {
    return this.props.path.split('/').filter((x) => Boolean(x));
  }

  segmentSelected(index) {
    const joined = this.segments.slice(0, index + 2).join('/');
    this.props.onPathChange(`${joined}`);
  }

  render() {
    return <div className="Path-header">
      <Dropdown
        open={this.state.dropdownOpen}
        onClose={() => this.setState({ dropdownOpen: false })}
      >
        {this.props.disks.map((x) =>
          <Dropdown.Item
            key={x}
            onClick={() => this.props.onPathChange(`${x}/`)}
          ><span className="Path-header-disk">{x}</span></Dropdown.Item>
        )}
      </Dropdown>

      <div className="Path-header-inner">
        {this.driveSegment && 
          <button onClick={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
            <span className="Segment" title="Change Drive">{this.driveSegment}</span>/
          </button>
        }

        {this.otherSegments.map((x, index) =>
          <span key={`${x}/${index}`}>
            <span
              className="Segment"
              onClick={() => this.segmentSelected(index)}
            >
              {x}
            </span>/
          </span>)}
      </div>
    </div>;
  }
}

export default PathHeader;