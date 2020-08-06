import React from 'react';
import './PathHeader.css';

class PathHeader extends React.Component {
  get segments() {
    return this.props.path.substring(1).split('/');
  }

  segmentSelected(index) {
    const joined = this.segments.slice(0, index + 1).join('/');
    this.props.onPathChange(`/${joined}`);
  }

  render() {
    return <div className="Directory-path">
      <div className="Path">
        {this.segments.map((x, index) =>
          <span key={`${x}/${index}`}>/
            <span
              className="Segment"
              onClick={() => this.segmentSelected(index)}
            >
              {x}
            </span>
          </span>)}
      </div>

      <div className="Filename">
          
      </div>
    </div>;
  }
}

export default PathHeader;