import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'

class SearchBar extends Component {
  render() {
    const { searchResults, onSearch, onChangeShelf } = this.props
    return (
      <div>
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => onSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Book
            onChangeShelf={onChangeShelf}
            booksToShow={searchResults}
          />
        </div>
      </div>
    )
  }
}

export default SearchBar