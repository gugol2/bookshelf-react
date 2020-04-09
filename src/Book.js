import React from 'react';

export class Book extends React.PureComponent {

    changeShelf = ({target: {value: newShelf }}) => {
        // pick event.target.value as newShelf with advanced ES6 destructurin
        
        this.props.moveBook(this.props.book, newShelf);
    }
    
    render () {
        const { book } = this.props;
        const { title, authors, imageLinks } = book;
        const shelf = book.shelf || 'none';
        console.log('rendered book', title);

        return (
            <div className="book">
                <div className="book-top">
                <div 
                    className="book-cover" 
                    style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}>
                </div>
                <div className="book-shelf-changer">
                    <select value={shelf} onChange={this.changeShelf} >
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
}
