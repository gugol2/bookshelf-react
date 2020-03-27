import React from 'react';
import { Book } from './Book';
import * as BooksAPI from './BooksAPI';
import { reduceBooksSearched } from "./utils/utilities";

export class Search extends React.Component {
    state = {
        query: '',
        booksSearched: [],
        errMessage: ''
    }

    componentDidMount() {
        this.timeout = null;
    }

    debounce = (fn, wait) => {
        return (...args) => {
            const functionCall = () => fn.apply(this, args);
        
            clearTimeout(this.timeout);
            this.timeout = setTimeout(functionCall, wait);
        }
    }

    updateQuery = (event) => {
        event.preventDefault();
        const query = event.target.value;

        this.setState(() => ({
            query: query
        }));

        this.debounce(this.updateSearch, 500)(query);
    }

    updateSearch = (query) => {
        if(query){
            BooksAPI.search(query).then(booksSearched => {
                if(booksSearched.error) {
                    this.resetBookState();
                    console.log(`The error is: ${booksSearched.error}`);
                } else {
                    const booksReady = reduceBooksSearched(booksSearched, this.props.books);
    
                    this.setState(() => ({
                        booksSearched: booksReady
                    }));
                }
            });
        } else {
            this.resetBookState();
        }
    }

    resetBookState = () => {
        this.setState(() => ({
            booksSearched: [],
            errMessage: 'No books found!'
        })); 
    }

    moveBook = (book, shelf) => {
        this.props.onMoveBook(book, shelf);
    }

    render () {
        const { onToggleView } = this.props;
        const { query, booksSearched, errMessage } = this.state;

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
                        {/* {JSON.stringify(query)} */}
    
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksSearched.map(book => (
                            <li key={book.id}>
                                <Book 
                                    book={book}
                                    moveBook={this.moveBook}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
                {errMessage && (<div className='search-books-error'>
                    {errMessage}
                </div>)}
            </div>
        )
    }
}