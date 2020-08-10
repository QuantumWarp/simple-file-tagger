import React from 'react';
import './TitleBar.css';
import { FaRegWindowMinimize, FaRegWindowMaximize, FaRegWindowRestore, FaRegWindowClose } from 'react-icons/fa';

const electron = window.require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { maximized: false };
  }

  componentDidMount() {
    const window = BrowserWindow.getAllWindows()[0];
    window.on('resize', () => {
      this.setState({ maximized: window.isMaximized() });
    });
  }

  render() {
    return <div className="Title-bar">
      <div className="Title">File Tagger</div>
      <div className="Title-buttons">
        <button onClick={() => BrowserWindow.getFocusedWindow().minimize()}>
          <FaRegWindowMinimize></FaRegWindowMinimize>
        </button>
        {!this.state.maximized &&
          <button onClick={() => BrowserWindow.getFocusedWindow().maximize()}>
            <FaRegWindowMaximize></FaRegWindowMaximize>
          </button>
        }
        {this.state.maximized &&
          <button onClick={() => BrowserWindow.getFocusedWindow().restore()}>
            <FaRegWindowRestore></FaRegWindowRestore>
          </button>
        }
        <button onClick={() => BrowserWindow.getFocusedWindow().close()}>
          <FaRegWindowClose></FaRegWindowClose>
        </button>
      </div>
    </div>;
  }
}

export default TitleBar;