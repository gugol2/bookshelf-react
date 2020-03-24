import React from 'react';
import { Bookshelf } from './Bookshelf';

export class Library extends React.Component {


    moveBook = (book, shelf) => {
        console.log('book', book);
        console.log('shelf', shelf);
    }
    
    render () {
        const { books, onToggleView } = this.props;

        const shelves = books.reduce((acc, cur) => {
            acc[cur.shelf] = [...acc[cur.shelf] || [], cur];
            return acc
        }, {});
    
        console.log('shelves is:', shelves);
        console.log('books received', books);

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.entries(shelves).map(([key, value]) => (
                            <Bookshelf 
                                bookshelfName={key}
                                booksInThisShelf={value}
                                key={key}
                                moveBook={this.moveBook}
                            />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={onToggleView}>Add a book</button>
                </div>
            </div>
        )
    }
}