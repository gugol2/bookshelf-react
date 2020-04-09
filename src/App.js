import React, { useState, useEffect } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Search } from './Search';
import { Library } from './Library';
import { Route } from 'react-router-dom';

export const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((booksRetrieved) => {
      setBooks(booksRetrieved)
    });
  }, [])

  const moveBook = async (book, shelf) => {
    const moveBookOptimisticly = (bookToMove) => {

      // If the book has shelf update the state 
      if(bookToMove.shelf && bookToMove.shelf !== 'none') {
        setBooks([...books.filter(b => b.id !== bookToMove.id), bookToMove]);

      } 
      
      else {
        setBooks([...books.filter(b => b.id !== bookToMove.id)])
      }
    }

    const bookUpdated = {
      ...book,
      shelf
    };

   // Move the book to a new shelf optimisticly
    moveBookOptimisticly(bookUpdated);

    try {
      return await BooksAPI.update(book, shelf);
    } catch (e) {
      moveBookOptimisticly(book);
      return e;
    }
  }

  return (
    <div className="app">
      <Route exact path='/' render={()=> (
        <Library 
          onMoveBook={moveBook}
          books={books}
        />
      )} />

      <Route path='/search' render={()=> (
        <Search 
          onMoveBook={moveBook}
          books={books}
        />
      )} />
    </div>
  )
}