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
    BooksAPI.update(book, shelf).then(shelvesUpdated => {
      BooksAPI.get(book.id).then(book => {
        this.setState((currentState) => ({
          books: [...currentState.books.filter(b => b.id !== book.id), book]
        }));
      });
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search 
            onToggleView={this.onToggleView}
            onMoveBook={this.moveBook}
            books={this.state.books}
          />
        ) : (
          <Library 
            onToggleView={this.onToggleView}
            onMoveBook={this.moveBook}
            books={this.state.books}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
