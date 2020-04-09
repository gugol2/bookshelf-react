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
    const moveBookOptimisticly = (bookToMove) => {

      // If the book has shelf update the state 
      if(bookToMove.shelf && bookToMove.shelf !== 'none') {
        this.setState((currentState) => ({
          books: [...currentState.books.filter(b => b.id !== bookToMove.id), bookToMove]
        }));
      } 
      
      else {
        // If the book has NO shelf remove it from the state
        this.setState((currentState) => ({
          books: [...currentState.books.filter(b => b.id !== bookToMove.id)]
        }));
      }
    }

    const bookUpdated = {
      ...book,
      shelf
    };

   // Move the book to a new shelf optimisticly
    moveBookOptimisticly(bookUpdated);

    // If error move the book back to its previous shelf
    BooksAPI.update(book, shelf).catch(shelvesUpdated => {
      moveBookOptimisticly(book);
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
