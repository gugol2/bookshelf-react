import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css'
import { Search } from './Search';
import { Library } from './Library';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  onToggleView = () => {
    this.setState((currentState) => ({
      showSearchPage: !currentState.showSearchPage
    }));
  }

  moveBook = (book, shelf) => {
    console.log('book', book);
    console.log('shelf', shelf);

    BooksAPI.update(book, shelf);
  }

  render() {
    console.log('books passed', this.state.books);

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search 
            onToggleView={this.onToggleView}
            books={this.state.books}
          />
        ) : (
          <Library 
            onToggleView={this.onToggleView}
            books={this.state.books}
            onMoveBook={this.moveBook}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
