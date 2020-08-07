import React from 'react';
import './DiskHeader.css';

class DiskHeader extends React.Component {
  get currentDisk() {
    return this.props.path.split('/')[0];
  }

  render() {
    return <div className="Disk-header">
      <select
        value={this.currentDisk}
        onChange={(event) => this.props.onPathChange(event.target.value)}
      >
        <option>Disks</option>
        {this.props.disks.map((x) =>
          <option
            key={x}
            value={x}
          >
            {x}
          </option>
        )}
      </select>
    </div>;
  }
}

export default DiskHeader;