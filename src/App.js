import React from 'react';
import './App.css';
import BookmarkHeader from './header/BookmarkHeader';
import PathHeader from './header/PathHeader';
import FileDetail from './file-detail/FileDetail';
import FileList from './file-explorer/FileList';
import TagContainer from './tagging/TagContainer';
import Notification from './controls/Notification';
import pathUtil from 'path';
import NotificationHelper from './helper/notification-helper';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const nodeDiskInfo = electron.remote.require('node-disk-info');

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      path: '',
      filename: null,
      files: [],
      disks: [],
    };
  }

  async componentDidMount() {
    electron.ipcRenderer.on('loadFilesResponse', (event, files) => {
      if (this.state.path.split('/').filter((x) => Boolean(x)).length > 1) {
        files = [{ name: '..', isUp: true }].concat(files);
      }
      this.setState({ files });
    });

    const path = localStorage.getItem('path');
    if (path) {
      this.setLocation(path);
    }
    this.loadDisks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.path !== prevState.path) {
      localStorage.setItem('path', this.state.path);
      electron.ipcRenderer.send('loadFiles', this.state.path + '/');
    }
  }

  setLocation(fullPath) {
    const isDiskPath = this.state.disks.find((x) => fullPath === x);
    const statPath = fullPath + (isDiskPath ? '/' : '');
    fullPath = isDiskPath ? fullPath : pathUtil.resolve(fullPath).substring(1);

    fs.lstat(statPath, (err, stats) => {
      if (err) {
        NotificationHelper.notify({ type: 'Error', message: 'Invalid file or path' });
        return;
      }

      if (stats.isDirectory()) {
        this.setState({ path: fullPath, filename: null });
      } else {
        const filename = fullPath.split('/')[fullPath.split('/').length - 1];
        const path = fullPath.substring(0, fullPath.length - filename.length - 1);
        this.setState({ path, filename });
      }
    });
  }

  async loadDisks() {
    const disks = await nodeDiskInfo.getDiskInfo();
    this.setState({
      disks: disks.map((x) => x.mounted),
      path: this.state.path ? this.state.path : disks[0].mounted,
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
      () => {
        this.setState({ files, filename: newFilename })
        NotificationHelper.notify({ key: `${index}-${this.state.path}`, type: 'Success', message: 'Filename updated' })
      },
    );
  }

  render() {
    return <div className="App">
      <Notification></Notification>
      <header>
        <BookmarkHeader
          path={this.state.path}
          onPathChange={(event) => this.setLocation(event)}
        />
        <PathHeader
          path={this.state.path}
          disks={this.state.disks}
          onPathChange={(event) => this.setLocation(event)}
        />
      </header>

      <main>
        <article>
          <div>File Explorer</div>
          <FileList
            path={this.state.path}
            filename={this.state.filename}
            files={this.state.files}
            onLocationSelected={(fullPath) => this.setLocation(fullPath)}
          />
        </article>

        <article>
          <div>Tagging</div>
          <TagContainer
            path={this.state.path}
            filename={this.state.filename}
            onFilenameChange={(newFilename) => this.updateFilename(newFilename)}
          />
        </article>

        <article>
          <div>File Preview</div>
          <FileDetail
            path={this.state.path}
            filename={this.state.filename}
          />
        </article>
      </main>
    </div>;
  }
}

export default App;
