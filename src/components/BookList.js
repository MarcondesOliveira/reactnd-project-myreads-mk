import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';

import BookShelf from './BookShelf';

import { Animated } from "react-animated-css";

class BookList extends Component {

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(filteredBooks =>
      this.setState({
        books: filteredBooks
      })
    );
  }

  moveBook = (book, shelf) => {
    if (!this.state.books) {
      BooksAPI.update(book, shelf)
        .then(() => (shelf !== 'none' ? this.context.router.history.push('/') : null))
        .catch(() => alert('Something went wrong! Please try again!'));
    } else {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(object => object.id !== book.id).concat([book])
        }));
      });
    }
  };

  render() {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-content">
            <div>
              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
              <BookShelf
                title="Currently to Reading"
                moveBook={this.moveBook.bind(this)}
                shelf={`currentlyReading`}
                dataBook={this.state.books}
              />
              </Animated>
              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
              <BookShelf
                title="Want to read"
                moveBook={this.moveBook.bind(this)}
                shelf={`wantToRead`}
                dataBook={this.state.books}
              />
              </Animated>
              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
              <BookShelf
                title="Read"
                moveBook={this.moveBook.bind(this)}
                shelf={`read`}
                dataBook={this.state.books}
              />
              </Animated>
            </div>
          </div>

          <div className="open-search">
            <Link to="/search"><button>Add a book</button></Link>
          </div>
        </div>}
      </div>
    );
  }
}

export default BookList;