class FileHelper {
  static getInfo(entry) {
    return {
      isUp: entry.name === '..',
      isDirectory: entry.isDirectory && entry.isDirectory(),
      isFile: entry.isFile && entry.isFile(),
      isImage: this.isImage(entry.name),
      extension: this.getExtension(entry.name),
    };
  }

  static isImage(filename) {
    return ['.png', '.jpg', '.jpeg'].find((x) => filename.endsWith(x));
  }

  static getExtension(path) {
    const name = path.split('/')[path.split('/').length - 1];
    if (!name.includes('.')) return null;
    const nameSplit = name.split('.');
    return nameSplit[nameSplit.length - 1];
  }

  static parseFilename(filename) {
    let extension = '';
    let tags = [];
    let dateTag = '';
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
      dateTag = tags.find((x) => this.isDateTag(x));
      tags = tags.filter((x) => x !== dateTag);
      name = name.substring(0, startTagIndex).trimEnd();
    }

    return { name, tags, dateTag, extension };
  }

  static isDateTag(tag) {
    return tag.match(/^\d\d\d\d(-\d\d)?(-\d\d)?$/);
  }

  static createFilename({ name, tags, dateTag, extension }) {
    const sortedTags = tags.sort();
    const combinedTags = dateTag ? [dateTag].concat(sortedTags) : sortedTags;
    let filename = name;
    filename += combinedTags.length === 0 ? '' : ` [${combinedTags.join(',')}]`;
    filename += `.${extension}`;
    return filename;
  }
}

export default FileHelper;
