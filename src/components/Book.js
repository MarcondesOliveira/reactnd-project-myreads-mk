import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

class Book extends PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  state = {
    value: 'none'
  };

  render() {
    const { book, moveBook } = this.props

    return (
      <div>
        <li className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : null})`
              }}
            />
            <div className="book-shelf-changer">
              <select value={book.shelf ? book.shelf : 'none'} onChange={event => moveBook(book, event.target.value)}>
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">
            {book.title}
          </div>
          <div className="book-authors">
            {book.authors}
          </div>
        </li>
      </div>
    );
  }
}

export default Book;