import React from 'react';
import { Book } from './Book';

export const Bookshelf = (props) => {
    const { booksInThisShelf, bookshelfName } = props;

    const bookshelfNameReady = () => {
        const bookshelfNameReadyString = bookshelfName.split(/(?=[A-Z])/).join(' ');
        return `${bookshelfNameReadyString.charAt(0).toUpperCase()}${bookshelfNameReadyString.slice(1)}`
    }

    const moveBook = (book, shelf) => {
        props.moveBook(book, shelf);
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfNameReady()}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksInThisShelf.map(bookITS => (
                        <li key={bookITS.id}>
                            <Book 
                                book={bookITS}
                                moveBook={moveBook}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}