import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from '../BooksAPI';

import Book from './Book';

class Search extends Component {
  static propTypes = {
    dataBook: PropTypes.array,
    moveBook: PropTypes.func.isRequired
  };

  state = {
    query: '',
    books: []
  };

  updateQuery = query => {
    BooksAPI.search(query).then(books => (books ? this.setState({ books }) : []));
    this.setState({ query });
  };

  showSearchResults() {
    const { books } = this.state;
    let moveBook = this.props.moveBook;

    if (this.state.books !== books) {
      this.setState({ books });
    } else {
      return books.error
        ? <div>No results found</div>
        : books.map((book) => {
            return <Book moveBook={moveBook} key={book.id} book={book} />;
          });
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.showSearchResults()}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;