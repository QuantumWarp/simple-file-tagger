const { ipcMain } = require('electron');
const fs = require('fs');

module.exports = {
  setup() {
    ipcMain.on('loadFiles', (event, path) => {
      fs.readdir(
        path,
        { withFileTypes: true },
        (_err, files) => {
          const result = files.map((x) => ({
            name: x.name,
            isDirectory: x.isDirectory(),
            isFile: x.isFile(),
          }));
          event.sender.send('loadFilesResponse', result);
        },
      );
    });
  },
};
