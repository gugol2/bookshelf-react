import React from 'react';
import { Bookshelf } from './Bookshelf';
import { splitBooksInShelves } from "./utils/utilities";
import { Link } from 'react-router-dom';

export const Library = (props) => {
    const shelves = splitBooksInShelves(props.books);

    const moveBook = (book, shelf) => {
        props.onMoveBook(book, shelf);
    }
    
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>Bookshelf React</h1>
            </div>

            <div className="list-books-content">
                <div>
                    {Object.entries(shelves).map(([key, value]) => (
                        <Bookshelf 
                            bookshelfName={key}
                            booksInThisShelf={value}
                            key={key}
                            moveBook={moveBook}
                        />
                    ))}
                </div>
            </div>

            <div className="open-search">
                <Link to='/search'>
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    )
}