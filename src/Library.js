import React from 'react';
import { Bookshelf } from './Bookshelf';

export const Library = (props) => {
    console.log('books received', props.books);
    const shelves = props.books.reduce((acc, cur) => {
        acc[cur.shelf] = [...acc[cur.shelf] || [], cur];
        return acc
    }, {});

    console.log('shelves is:', shelves);
    
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
                        />
                    ))}
                </div>
            </div>
            <div className="open-search">
                <button onClick={props.onToggleView}>Add a book</button>
            </div>
        </div>
    )
}