import React from 'react';
import './BookmarkHeader.css';

class BookmarkHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarks: [] };
  }

  get currentBookmark() {
    return this.state.bookmarks.find((x) => x.path === this.props.path);
  }

  componentDidMount() {
    const bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks) {
      this.setState({ bookmarks: JSON.parse(bookmarks) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.bookmarks.length !== prevState.bookmarks.length) {
      localStorage.setItem('bookmarks', JSON.stringify(this.state.bookmarks));
    }
  }

  addBookmark() {
    const pathSplit = this.props.path.split('/');
    const bookmark = {
      name: pathSplit[pathSplit.length - 1] || 'Root',
      path: this.props.path,
    };
    const newBookmarks = this.state.bookmarks
      .filter((x) => x.path !== bookmark.path)
      .concat([bookmark]);
    this.setState({ bookmarks: newBookmarks });
  }

  removeBookmark(bookmark) {
    const newBookmarks = this.state.bookmarks.filter([bookmark]);
    this.setState({ bookmarks: newBookmarks });
  }

  render() {
    return <div className="Bookmark-header">
      <select
        value={this.currentBookmark ? this.currentBookmark.path : ''}
        onChange={(event) => this.props.onPathChange(event.target.value)}
      >
        <option>Bookmarks</option>
        {this.state.bookmarks.map((x) =>
          <option
            key={x.name}
            value={x.path}
          >
            {x.name}
          </option>
        )}
      </select>
      <button onClick={() => this.addBookmark()}>Add</button>
    </div>;
  }
}

export default BookmarkHeader;