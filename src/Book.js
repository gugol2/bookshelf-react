import React from 'react';

export class Book extends React.Component {
    state = {
        shelf: this.props.book.shelf
    }

    changeShelf = (event) => {
        event.preventDefault();
        const shelf = event.target.value;

        this.setState(() => ({
            shelf
        }))

        this.props.moveBook(this.props.book, shelf);
    }

    render() {
        const { title, authors, imageLinks } = this.props.book;

        return (
            <div className="book">
                <div className="book-top">
                <div 
                    className="book-cover" 
                    style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}>
                </div>
                <div className="book-shelf-changer">
                    <select value={this.state.shelf} onChange={this.changeShelf} >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }
}
