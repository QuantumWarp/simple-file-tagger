import React from 'react';
import './BookmarkHeader.css';
import { FaBookmark, FaTrash, FaRegStar, FaStar } from 'react-icons/fa';
import Dropdown from '../controls/Dropdown';

class BookmarkHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      bookmarks: [],
    };
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

  removeBookmark(path) {
    const newBookmarks = this.state.bookmarks.filter((x) => x.path !== path);
    this.setState({ bookmarks: newBookmarks });
  }

  render() {
    return <div className="Bookmark-header">
      <button
        title="Bookmarks"
        onClick={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}
      >
        <FaBookmark></FaBookmark>
      </button>

      <button title={this.currentBookmark ? 'Unfavourite' : 'Favourite'}>
        {!this.currentBookmark && <FaRegStar onClick={() => this.addBookmark()}></FaRegStar>}
        {this.currentBookmark && <FaStar onClick={() => this.removeBookmark(this.props.path)}></FaStar>}
      </button>

      <Dropdown open={this.state.dropdownOpen}>
        {this.state.bookmarks.map((x) =>
          <Dropdown.Item
            key={x.path}
            onClick={() => this.props.onPathChange(x.path)}
          >
            <div title={x.path}>
              <span>{x.name}</span>
              <FaTrash onClick={() => this.removeBookmark(x.path)}></FaTrash>
            </div>
          </Dropdown.Item>
        )}
      </Dropdown>
    </div>;
  }
}

export default BookmarkHeader;