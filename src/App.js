import React from 'react';
import pathUtil from 'path';
import './App.css';
import TitleBar from './header/TitleBar';
import BookmarkHeader from './header/BookmarkHeader';
import PathHeader from './header/PathHeader';
import FileDetail from './file-detail/FileDetail';
import FileList from './file-explorer/FileList';
import TagContainer from './tagging/TagContainer';
import Notification from './controls/Notification';
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
      const { path } = this.state;
      let newFiles = [...files];
      if (path.split('/').filter((x) => Boolean(x)).length > 1) {
        newFiles = [{ name: '..', isUp: true }].concat(files);
      }
      this.setState({ files: newFiles });
    });

    const path = localStorage.getItem('path');
    if (path) {
      this.setLocation(path);
    }
    this.loadDisks();
  }

  componentDidUpdate(prevProps, prevState) {
    const { path } = this.state;
    if (path !== prevState.path) {
      localStorage.setItem('path', path);
      electron.ipcRenderer.send('loadFiles', `${path}/`);
    }
  }

  setLocation(newFullPath) {
    let fullPath = newFullPath;
    const { disks } = this.state;
    const isDiskPath = disks.find((x) => fullPath === x);
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
    const { path } = this.state;
    const disks = await nodeDiskInfo.getDiskInfo();
    this.setState({
      disks: disks.map((x) => x.mounted),
      path: path || disks[0].mounted,
    });
  }

  updateFilename(newFilename) {
    const { files, path, filename } = this.state;
    const newFiles = [...files];
    const file = files.find((x) => x.name === filename);
    const index = newFiles.indexOf(file);
    const newFile = { ...file, name: newFilename };
    newFiles[index] = newFile;

    fs.rename(
      `${path}/${filename}`,
      `${path}/${newFilename}`,
      () => {
        this.setState({ files: newFiles, filename: newFilename });
        NotificationHelper.notify({ key: `${index}-${path}`, type: 'Success', message: 'Filename updated' });
      },
    );
  }

  render() {
    const {
      disks, files, path, filename,
    } = this.state;

    return (
      <div className="App">
        <Notification />

        <TitleBar />

        <header>
          <BookmarkHeader
            path={path}
            onPathChange={(event) => this.setLocation(event)}
          />
          <PathHeader
            path={path}
            disks={disks}
            onPathChange={(event) => this.setLocation(event)}
          />
        </header>

        <main>
          <article>
            <div>File Explorer</div>
            <FileList
              path={path}
              filename={filename}
              files={files}
              onLocationSelected={(fullPath) => this.setLocation(fullPath)}
            />
          </article>

          <article>
            <div>Tagging</div>
            <TagContainer
              path={path}
              filename={filename}
              onFilenameChange={(newFilename) => this.updateFilename(newFilename)}
            />
          </article>

          <article>
            <div>File Preview</div>
            <FileDetail
              path={path}
              filename={filename}
            />
          </article>
        </main>
      </div>
    );
  }
}

export default App;
