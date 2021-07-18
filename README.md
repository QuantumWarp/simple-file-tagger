# File Tagger

This project was created to quickly and easily tag files. The tagging method is to simply append the tags to the filename. Although crude it allows for simple searching using the file explorer and no database is required to store the tag mappings.

## Features

- Bookmarking commonly used folders
- Preview selected file if it is an image
- Support date tags
- Allow adding custom tags
- Care has been taken to avoid overwriting existing files accidently. Before renaming a file, first we check if it already exists.

## Potential Improvements

### Features

- Sort folders above files
- Allow deletion of files
- Add an in app help section
- Option for generating unique guid for initial filename
- Add search/filtering of file explorer, especially to show untagged files
- Easier to use date picker

### Code

- Using react hooks may provide a cleaner codebase
- Using a scoped css library would have made styling easier
- Refactor out more logic into helpers
- Use centralised store and actions to improve ease of following logic

### Bugs

- Although overwriting is prevented, failing file renames are not handled gracefully
