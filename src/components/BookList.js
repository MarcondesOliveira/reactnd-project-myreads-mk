import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BookShelf from './BookShelf'

export default class BookList extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <div className="list-books-content">
            <BookShelf />
        </div>
      </div>
    )
  }
}
