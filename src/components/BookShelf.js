import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

export default class BookShelf extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
      <ol className="books-grid">
        <Book />
      </ol>
      </div>
    )
  }
}
