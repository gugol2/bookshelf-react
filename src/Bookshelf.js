import React from 'react';
import { Book } from './Book';

export const Bookshelf = (props) => {
    const { booksInThisShelf } = props;
    
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {booksInThisShelf.map(bookITS => (
                    <Book 
                        title={bookITS.title}
                        authors={bookITS.authors}
                        imageLinks={bookITS.imageLinks}
                    />
                ))}
            </ol>
            </div>
        </div>
    )
}