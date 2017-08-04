import React, { Component } from 'react'
import Book from './book'

class BookShelf extends Component {
    render() {
        const { booksOnShelf, title, onChangeShelf } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <Book
                        booksToShow={booksOnShelf}
                        onChangeShelf={onChangeShelf}
                    />
                </div>
            </div>

        )
    }
}

export default BookShelf