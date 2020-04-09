import React from 'react';

export const Book = React.memo((props) => {

    const changeShelf = ({target: {value: newShelf }}) => {
        // pick event.target.value as newShelf with advanced ES6 destructurin
        
        props.moveBook(props.book, newShelf);
    };
    
    const { book } = props;
    const { title, authors, imageLinks } = book;
    const shelf = book.shelf || 'none';
    // console.log('rendered book', title);

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
});
