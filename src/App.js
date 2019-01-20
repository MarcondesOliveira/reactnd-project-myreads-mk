import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './App.css';

import * as BooksAPI from './BooksAPI';

import Search from './components/Search';
import BookList from './components/BookList'

import { Animated } from "react-animated-css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faBook);

class App extends Component {

  state = {
    books: []
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
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
      <div className="app">
        <Route
          path="/search"
          render={() => <Search dataBook={this.state.books} moveBook={this.moveBook.bind(this)} />}
        />
        <Route
          exact
          path="/"
          render={() =>
            <div className="list-books">
              <div className="list-books-title">
              <Animated animationIn="slideInDown" isVisible={true}>
                <h1><FontAwesomeIcon icon="book" /> MyReads</h1>
              </Animated>
              </div>

              <BookList />

              <div className="open-search">
                <Link to="/search"><button>Add a book</button></Link>
              </div>
            </div>}
        />
      </div>
    );
  }
}

export default App;