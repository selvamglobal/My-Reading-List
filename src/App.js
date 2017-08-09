import React, { Component } from 'react'
import Header from './components/header'
import SearchIcon from './components/searchicon'
import BookShelf from './components/bookshelf'
import SearchBar from './components/searchbar'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {

  state = {
    booksOnShelf: [],
    searchResults: [],
  }
  componentDidMount() {
    BooksAPI.getAll().then((allReturnedBooks) => {
      this.setState({ booksOnShelf: allReturnedBooks })
    })
  }

  handleSearch = (query) => {
    if (query !== ' ') {
      BooksAPI
        .search(query.trim(), 20)
        .then((allSearchResults) => {
          if (allSearchResults && allSearchResults.length) {
            allSearchResults.map(
              book => (this.state.booksOnShelf.filter(
                (b) => b.id === book.id
              ).map(
                b => book.shelf = b.shelf
                ))
            )
            for (var i = 0; i < allSearchResults.length; i++) {
              if (!allSearchResults[i].shelf) {
                allSearchResults[i].shelf = 'none';
              }
            }
            this.setState({ searchResults: allSearchResults })
          } else {
            this.setState({ searchResults: [] })
          }
        })
    }
  }
  handleChange = (bookToMove, shelfSelected) => {
    BooksAPI.update(bookToMove, shelfSelected)
      .then(() => {
        this.setState((state) => {
          let newShelfState = state.booksOnShelf.map(book => {
            book.id === bookToMove.id && (book.shelf = shelfSelected);
            return book;
          });
          return { booksOnShelf: newShelfState };
        })
      })
  }

  handleAddFromSearch = (bookToAdd, shelfSelected) => {
    this.setState(state => {
      bookToAdd.shelf = shelfSelected
      return state
    })
    BooksAPI.update(bookToAdd, shelfSelected)
      .then(() => {
        BooksAPI.get(bookToAdd.id)
          .then((bookRetrieved) => {
            this.setState((state) => {
              let newShelfState = state.booksOnShelf.filter(b => (b.id !== bookToAdd.id)).concat(bookRetrieved);
              return { booksOnShelf: newShelfState }
            })

          })
      })
  }

  render() {
    const { booksOnShelf, searchResults } = this.state
    const shelves =
      [{ id: 'currentlyReading', title: 'Currently Reading', books: booksOnShelf.filter((book) => book.shelf === "currentlyReading") },
      { id: 'wantToRead', title: 'Want to Read', books: booksOnShelf.filter((book) => book.shelf === "wantToRead") },
      { id: 'read', title: 'Read', books: booksOnShelf.filter((book) => book.shelf === "read") }]

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">           
            <Header />
            <div className="list-books-content">
              {shelves.map(shelff => <BookShelf onChangeShelf={this.handleChange} id={shelff.id} booksOnShelf={shelff.books} title={shelff.title} />
              )}
            </div>
            <SearchIcon />
          </div>
        )}
        />

        <Route exact path="/search" render={() => (
          <SearchBar
            searchResults={searchResults}
            onChangeShelf={this.handleAddFromSearch}
            onSearch={this.handleSearch}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
