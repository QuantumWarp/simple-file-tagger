import React from 'react';
import {
  VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore,
} from 'react-icons/vsc';

import './TitleBar.css';
import { ReactComponent as Logo } from '../assets/logo.svg';

const electron = window.require('electron');
const { BrowserWindow } = electron.remote;

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
    const { maximized } = this.state;

    return (
      <div className="Title-bar">
        <div className="Title">
          <Logo className="Logo" />
          File Tagger
        </div>

        <div className="Title-buttons">
          <button type="button" onClick={() => BrowserWindow.getFocusedWindow().minimize()}>
            <VscChromeMinimize />
          </button>

          {!maximized && (
            <button type="button" onClick={() => BrowserWindow.getFocusedWindow().maximize()}>
              <VscChromeMaximize />
            </button>
          )}

          {maximized && (
            <button type="button" onClick={() => BrowserWindow.getFocusedWindow().restore()}>
              <VscChromeRestore />
            </button>
          )}

          <button type="button" onClick={() => BrowserWindow.getFocusedWindow().close()}>
            <VscChromeClose />
          </button>
        </div>
      </div>
    );
  }
}

export default TitleBar;
