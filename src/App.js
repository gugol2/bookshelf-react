import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Search } from './Search';
import { Library } from './Library';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  moveBook = (book, shelf) => {
    const bookMoved = {
      ...book,
      shelf
    };
    
    // Move the book optimisticly
    this.setState((currentState) => ({
      books: [...currentState.books.filter(b => b.id !== book.id), bookMoved]
    }));

    BooksAPI.update(book, shelf).catch(shelvesUpdated => {
      this.setState((currentState) => ({
        books: [...currentState.books.filter(b => b.id !== book.id), book]
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=> (
          <Library 
            onMoveBook={this.moveBook}
            books={this.state.books}
          />
        )} />

        <Route path='/search' render={()=> (
          <Search 
            onMoveBook={this.moveBook}
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
