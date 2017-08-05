import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import { Debounce } from 'react-throttle';

class SearchBar extends Component {
  render() {
    const { searchResults, onSearch, onChangeShelf } = this.props
    return (
      <div>
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => onSearch(event.target.value)}
            />
            </Debounce>
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