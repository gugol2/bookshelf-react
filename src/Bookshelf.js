import React from 'react';
import { Book } from './Book';

export const Bookshelf = (props) => {
    const { booksInThisShelf, bookshelfName } = props;

    const bookshelfNameReady = () => {
        const bookshelfNameReadyString = bookshelfName.split(/(?=[A-Z])/).join(' ');
        return `${bookshelfNameReadyString.charAt(0).toUpperCase()}${bookshelfNameReadyString.slice(1)}`
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfNameReady()}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksInThisShelf.map(bookITS => (
                        <li key={bookITS.id}>
                            <Book 
                                title={bookITS.title}
                                authors={bookITS.authors}
                                imageLinks={bookITS.imageLinks}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}