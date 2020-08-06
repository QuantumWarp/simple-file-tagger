import React from 'react';
import './App.css';
import BookmarkHeader from './header/BookmarkHeader';
import PathHeader from './header/PathHeader';
import FileDetail from './file-detail/FileDetail';
import FileList from './file-explorer/FileList';
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
      files: [],
    };
  }


  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.path !== prevState.path) {
      this.loadFiles();
    }
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

  loadFiles() {
    fs.readdir(
      this.state.path,
      { withFileTypes: true },
      (err, files) => {
        files = [{ name: '..' }].concat(files);
        this.setState({ files });
      });
  }

  updateFilename(newFilename) {
    const files = [...this.state.files];
    const file = this.state.files.find((x) => x.name === this.state.filename);
    const index = files.indexOf(file);
    const newFile = { ...file, name: newFilename };
    files[index] = newFile;

    fs.rename(
      `${this.state.path}/${this.state.filename}`,
      `${this.state.path}/${newFilename}`,
      () => this.setState({ files, filename: newFilename }),
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
        <FileList
          path={this.state.path}
          filename={this.state.filename}
          files={this.state.files}
          onLocationSelected={(fullPath) => this.setLocation(fullPath)}
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
