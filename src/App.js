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
    BooksAPI.update(bookToAdd, shelfSelected)
      .then(() => {
        BooksAPI.get(bookToAdd.id)
          .then((bookRetrieved) => {
            this.setState((state) => {
              let newShelfState = state.booksOnShelf.concat(bookRetrieved);
              return { booksOnShelf: newShelfState }
            })
          
          })
      })
  }

  render() {
    const { booksOnShelf, searchResults } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">           <Header />


            <div className="list-books-content">
              <BookShelf
                title="Currently Reading"
                booksOnShelf={booksOnShelf.filter((book) => book.shelf === "currentlyReading")}
                onChangeShelf={this.handleChange}
              />
              <BookShelf
                title="Want to Read"
                booksOnShelf={booksOnShelf.filter((book) => book.shelf === "wantToRead")}
                onChangeShelf={this.handleChange}
              />
              <BookShelf
                title="Read"
                booksOnShelf={booksOnShelf.filter((book => book.shelf === "read"))}
                onChangeShelf={this.handleChange}
              />
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
