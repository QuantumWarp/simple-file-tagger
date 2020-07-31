class FileHelper {
  static getInfo(entry) {
    return {
      isUp: entry.name === '..',
      isDirectory: entry.isDirectory && entry.isDirectory(),
      isFile: entry.isFile && entry.isFile(),
      isImage: ['.png', '.jpg', '.jpeg'].find((x) => entry.name.endsWith(x)),
      extension: this.getExtension(entry.name),
    };
  }

  static getExtension(path) {
    const name = path.split('/')[path.split('/').length - 1];
    if (!name.includes('.')) return null;
    const nameSplit = name.split('.');
    return nameSplit[nameSplit.length - 1];
  }
}

export default FileHelper;
