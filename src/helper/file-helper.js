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

  static parseTags(filename) {
    let extension = '';
    let tags = [];
    let name = filename;

    const lastDotIndex = name.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      extension = name.substring(lastDotIndex + 1);
      name = name.substring(0, lastDotIndex);
    }
    
    const startTagIndex = name.indexOf('[');
    const lastTagIndex = name.lastIndexOf(']');
    if (startTagIndex !== -1 && lastTagIndex !== -1) {
      tags = name.substring(startTagIndex + 1, lastTagIndex).split(',');
      name = name.substring(0, startTagIndex).trimEnd();
    }

    return { name, tags, extension };
  }

  static createFilename({ name, tags, extension }) {
    let filename = name;
    filename += tags.length === 0 ? '' : ` [${tags.sort().join(',')}]`;
    filename += `.${extension}`;
    return filename;
  }
}

export default FileHelper;
