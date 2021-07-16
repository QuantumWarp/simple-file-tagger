import pathUtil from 'path';
import React from 'react';

import './App.css';
import Notification from './controls/Notification';
import FileDetail from './file-detail/FileDetail';
import FileEditor from './file-editor/FileEditor';
import FileList from './file-explorer/FileList';
import BookmarkHeader from './header/BookmarkHeader';
import PathHeader from './header/PathHeader';
import TitleBar from './header/TitleBar';
import NotificationHelper from './helper/notification-helper';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const nodeDiskInfo = electron.remote.require('node-disk-info');

class App extends React.Component {
  static async fileExists(path) {
    return new Promise((resolve) => {
      fs.access(path, fs.F_OK, (err) => {
        resolve(!err);
      });
    });
  }

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
    electron.ipcRenderer.on('loadFilesResponse', (_event, files) => {
      const { path } = this.state;
      let newFiles = [...files];
      if (path.split('/').filter((x) => Boolean(x)).length > 1) {
        newFiles = [{ name: '..', isUp: true }].concat(files);
      }
      this.setState({ files: newFiles });
    });

    const path = localStorage.getItem('path');
    if (path) {
      await this.setLocation(path);
    }
    await this.loadDisks();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { path } = this.state;
    if (path !== prevState.path) {
      localStorage.setItem('path', path);
      electron.ipcRenderer.send('loadFiles', `${path}/`);
    }
  }

  async setLocation(newFullPath) {
    let fullPath = newFullPath;
    const { disks } = this.state;
    const isDiskPath = disks.find((x) => fullPath === x);
    const statPath = fullPath + (isDiskPath ? '/' : '');
    fullPath = isDiskPath ? fullPath : pathUtil.resolve(fullPath).substring(1);

    return new Promise((resolve) => {
      fs.lstat(statPath, (err, stats) => {
        if (err) {
          NotificationHelper.notify({ type: 'Error', message: 'Invalid file or path' });
        } else if (stats.isDirectory()) {
          this.setState({ path: fullPath, filename: null });
        } else {
          const filename = fullPath.split('/')[fullPath.split('/').length - 1];
          const path = fullPath.substring(0, fullPath.length - filename.length - 1);
          this.setState({ path, filename });
        }

        resolve();
      });
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

  async updateFilename(newFilename) {
    const { files, path, filename } = this.state;
    const newFiles = [...files];
    const file = files.find((x) => x.name === filename);
    const index = newFiles.indexOf(file);
    const newFile = { ...file, name: newFilename };
    newFiles[index] = newFile;
    const oldFullPath = `${path}/${filename}`;
    const newFullPath = `${path}/${newFilename}`;
    const alreadyExists = await App.fileExists(newFullPath);

    return new Promise((resolve) => {
      if (oldFullPath === newFullPath) {
        resolve(true);
      } else if (alreadyExists) {
        NotificationHelper.notify({ type: 'Warning', message: 'Filename already exists.' });
        resolve(false);
      } else {
        fs.rename(
          oldFullPath,
          newFullPath,
          () => {
            this.setState({ files: newFiles, filename: newFilename });
            NotificationHelper.notify({ key: `${index}-${path}`, type: 'Success', message: 'Filename updated' });
            resolve(true);
          },
        );
      }
    });
  }

  render() {
    const {
      disks, files, path, filename,
    } = this.state;

    return (
      <div className="App">
        <Notification />

        <TitleBar />

        <main>
          <div className="Controls">
            <article>
              <h2>File Explorer</h2>

              <FileList
                path={path}
                filename={filename}
                files={files}
                onLocationSelected={(fullPath) => this.setLocation(fullPath)}
              />
            </article>

            {filename && (
              <FileEditor
                path={path}
                filename={filename}
                onFilenameChange={(newFilename) => this.updateFilename(newFilename)}
              />
            )}
          </div>

          <div className="Preview">
            <header>
              <PathHeader
                path={path}
                disks={disks}
                onPathChange={(event) => this.setLocation(event)}
              />

              <BookmarkHeader
                path={path}
                onPathChange={(event) => this.setLocation(event)}
              />
            </header>

            <article>
              <FileDetail
                path={path}
                filename={filename}
              />
            </article>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
