import React from 'react';
import './App.css';
import BookmarkHeader from './header/BookmarkHeader';
import PathHeader from './header/PathHeader';
import FileDetail from './file-detail/FileDetail';
import FileExplorer from './file-explorer/FileExplorer';
import TagContainer from './tagging/TagContainer';
import pathUtil from 'path';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      path: '/Development/react/simple-file-tagger/test-files',
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
      const path = fullPath.substring(0, fullPath.length - filename.length - 1);
      this.setState({ path, filename });
    }
  }

  updateFilename(newFilename) {
    fs.rename(
      `${this.state.path}/${this.state.filename}`,
      `${this.state.path}/${newFilename}`,
      () => this.setState({ filename: newFilename }),
    );
  }

  render() {
    return <div className="App">
      <div>
        <BookmarkHeader
          path={this.state.path}
          onPathChange={(event) => this.setLocation(event)}
        />
        <PathHeader
          path={this.state.path}
          onPathChange={(event) => this.setLocation(event)}
        />
      </div>

      <main>
        <FileExplorer
          path={this.state.path}
          filename={this.state.filename}
          selectLocation={(fullPath) => this.setLocation(fullPath)}
        />

        <TagContainer
          path={this.state.path}
          filename={this.state.filename}
          onFilenameChange={(newFilename) => this.updateFilename(newFilename)}
        />

        <FileDetail
          path={this.state.path}
          filename={this.state.filename}
        />
      </main>
    </div>;
  }
}

export default App;
