const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const path = require('path');
const remoteMethods = require('./remote-methods');

const store = new Store();

remoteMethods.setup();

const createWindow = () => {
  const winBounds = store.get('winBounds', { height: 900, width: 1600 });

  const options = {
    ...winBounds,
    frame: isDev,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  };

  let mainWindow = new BrowserWindow(options);
  const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

  if (!isDev) {
    mainWindow.removeMenu();
  }
  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('close', () => {
    store.set('winBounds', mainWindow.getBounds());
    mainWindow = null;
  });
};

app.on('ready', createWindow);
