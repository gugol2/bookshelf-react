import React from 'react';
import { Book } from './Book';

export class Search extends React.Component {
    state = {
        query: '',
    }

    updateQuery = (event) => {
        event.preventDefault();

        const query = event.target.value.trim();
        console.log("query", query);

        this.setState(() => ({
            query: query
        }));
    }

    moveBook = (book, shelf) => {
        this.props.moveBook(book, shelf);
    }

    render () {
        const { onToggleView, books } = this.props;
        const { query } = this.state;

        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) || 
            book.authors[0].toLowerCase().includes(query.toLowerCase())
        );

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={onToggleView}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={this.updateQuery}  
                        />
                        {JSON.stringify(query)}
    
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {filteredBooks.map(book => (
                            <li key={book.id}>
                                <Book 
                                    book={book}
                                    moveBook={this.moveBook}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}