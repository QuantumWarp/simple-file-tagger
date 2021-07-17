import PropTypes from 'prop-types';
import React from 'react';
import {
  FaBookmark, FaRegStar, FaStar, FaTrash,
} from 'react-icons/fa';

import './BookmarkHeader.css';
import Dropdown from '../controls/Dropdown';
import NotificationHelper from '../helper/notification-helper';

const electron = window.require('electron');
const Store = electron.remote.require('electron-store');

class BookmarkHeader extends React.Component {
  constructor(props) {
    super(props);

    this.store = new Store();
    this.state = {
      dropdownOpen: false,
      bookmarks: [],
    };
  }

  componentDidMount() {
    const bookmarks = this.store.get('bookmarks');
    if (bookmarks) {
      this.setState({ bookmarks });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { bookmarks } = this.state;
    if (bookmarks.length !== prevState.bookmarks.length) {
      this.store.set('bookmarks', bookmarks);
    }
  }

  get currentBookmark() {
    const { path } = this.props;
    const { bookmarks } = this.state;
    return bookmarks.find((x) => x.path === path);
  }

  addBookmark() {
    const { path } = this.props;
    const { bookmarks } = this.state;
    const pathSplit = path.split('/');
    const bookmark = {
      name: pathSplit[pathSplit.length - 1] || 'Root',
      path,
    };
    const newBookmarks = bookmarks
      .filter((x) => x.path !== bookmark.path)
      .concat([bookmark]);
    this.setState({ bookmarks: newBookmarks });
    NotificationHelper.notify({ type: 'Success', message: 'Bookmarked' });
  }

  removeBookmark(path) {
    const { bookmarks } = this.state;
    const newBookmarks = bookmarks.filter((x) => x.path !== path);
    this.setState({ bookmarks: newBookmarks });
    NotificationHelper.notify({ type: 'Warning', message: 'Removed bookmark' });
  }

  render() {
    const { path, onPathChange } = this.props;
    const { bookmarks, dropdownOpen } = this.state;

    return (
      <div className="Bookmark-header">
        <button
          type="button"
          title={this.currentBookmark ? 'Unfavourite' : 'Favourite'}
        >
          {!this.currentBookmark && <FaRegStar onClick={() => this.addBookmark()} />}
          {this.currentBookmark && <FaStar onClick={() => this.removeBookmark(path)} />}
        </button>

        <button
          type="button"
          className="Bookmarks-button"
          title="Bookmarks"
          onClick={() => this.setState({ dropdownOpen: !dropdownOpen })}
        >
          <FaBookmark />
        </button>

        <Dropdown
          open={dropdownOpen}
          onClose={() => this.setState({ dropdownOpen: false })}
        >
          {bookmarks.map((x) => (
            <Dropdown.Item
              key={x.path}
              onClick={() => onPathChange(x.path)}
            >
              <div
                className="Bookmark-item"
                title={x.path}
              >
                <span>{x.name}</span>
                <FaTrash
                  className="Remove"
                  title="Remove bookmark"
                  onClick={(event) => { event.stopPropagation(); this.removeBookmark(x.path); }}
                />
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    );
  }
}

BookmarkHeader.propTypes = {
  path: PropTypes.string,
  onPathChange: PropTypes.func.isRequired,
};

BookmarkHeader.defaultProps = {
  path: '',
};

export default BookmarkHeader;
