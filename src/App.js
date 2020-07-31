import React from 'react';
import './App.css';
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
      selectedDir: '/',
      selectedFile: null,
    };
  }

  setSelectedPath(path) {
    path = pathUtil.resolve(path);
    const stats = fs.lstatSync(path);
    if (stats.isDirectory()) {
      this.setState({
        selectedDir: path,
        selectedFile: null,
      })
    } else {
      this.setState({ selectedFile: path });
    }
  }

  render() {
    return <div className="App">
      <FileExplorer
        selectedDir={this.state.selectedDir}
        selectedFile={this.state.selectedFile}
        selectPath={(path) => this.setSelectedPath(path)}
      />
      <TagList />
      <FileDetail
        filePath={this.state.selectedFile}
      />
    </div>;
  }
}

export default App;
