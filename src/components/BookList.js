import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';

import BookShelf from './BookShelf';

import { Animated } from "react-animated-css";

class BookList extends Component {

  state = {
    books: []
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }  

  render() {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-content">
            <div>
              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
              <BookShelf
                title="Currently to Reading"
                moveBook={this.moveBook}
                shelf={`currentlyReading`}
                dataBook={this.state.books}
              />
              </Animated>
              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
              <BookShelf
                title="Want to read"
                moveBook={this.moveBook}
                shelf={`wantToRead`}
                dataBook={this.state.books}
              />
              </Animated>
              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
              <BookShelf
                title="Read"
                moveBook={this.moveBook}
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