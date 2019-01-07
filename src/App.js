import React from "react";
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import "./App.css";

import Search from "./components/Search";
import BookList from './components/BookList'

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount(){
    BooksAPI.getAll().then(books => this.setState({books}))
  }

  changeShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then(response => {
      changedBook.shelf = shelf
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== changedBook.id)
          .concat(changedBook)
      }))
    })
  }

  render() {

    const { books } = this.state

    return (
      <div className="app">
          <Route path='/search' render={({history}) => (
            <Search books={books} changeShelf={this.changeShelf} />
          )} />

          <Route exact path='/' render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
              <BookList books={books} changeShelf={this.changeShelf} />
              <div className='open-search'>
                <Link to='/search'>Search</Link>
              </div>
            </div>
          )} />
      </div>
    );
  }
}

export default BooksApp;
