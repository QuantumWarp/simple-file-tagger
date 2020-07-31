import React from 'react';
import './App.css';
import PathHeader from './header/PathHeader';
import FileDetail from './file-detail/FileDetail';
import FileExplorer from './file-explorer/FileExplorer';
import TagList from './tagging/TagList';
import pathUtil from 'path';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      path: '/',
      filename: null,
    };
  }

  setLocation(fullPath) {
    fullPath = pathUtil.resolve(fullPath);
    const stats = fs.lstatSync(fullPath);
    if (stats.isDirectory()) {
      this.setState({ path: fullPath, filename: null });
    } else {
      const filename = fullPath.split('/')[fullPath.split('/').length - 1];
      const path = fullPath.substring(0, fullPath.length - filename.length);
      this.setState({ path, filename });
    }
  }

  render() {
    return <div className="App">
      <PathHeader
        path={this.state.path}
      />

      <main>
        <FileExplorer
          path={this.state.path}
          filename={this.state.filename}
          selectLocation={(fullPath) => this.setLocation(fullPath)}
        />

        <TagList />

        <FileDetail
          path={this.state.path}
          filename={this.state.filename}
        />
      </main>
    </div>;
  }
}

export default App;
