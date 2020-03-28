import React from 'react';

export const Book = (props) => {
    const { book, moveBook } = props;
    const { title, authors, imageLinks } = book;
    const shelf = book.shelf || 'none';

    const changeShelf = (event) => {
        const newShelf = event.target.value;

        moveBook(props.book, newShelf);
    }

    return (
        <div className="book">
            <div className="book-top">
            <div 
                className="book-cover" 
                style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}>
            </div>
            <div className="book-shelf-changer">
                <select value={shelf} onChange={changeShelf} >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors && authors.join(', ')}</div>
        </div>
    )
}
