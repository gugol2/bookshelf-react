import React from 'react';
import { Book } from './Book';
import * as BooksAPI from './BooksAPI';
import { reduceBooksSearched, filterOutBooksWithoutImages } from "./utils/utilities";
import { Link } from 'react-router-dom';

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

        this.setState(
            () => ({
                query: query.trim().length ? query : '',
                errMessage: ''
            }),
            () => this.debounce(this.updateSearch, 500)(this.state.query)
        );
    }

    updateSearch = (query) => {
        if(query){
            BooksAPI.search(query).then(booksSearched => {
                if(booksSearched.error) {
                    this.resetBookState('No books found!');
                    console.log(`The error is: ${booksSearched.error}`);
                } else {
                    
                    this.setState((currentState, props) => {
                        const filteredBooks = filterOutBooksWithoutImages(booksSearched);

                        return { 
                            booksSearched: filteredBooks
                        }
                    });
                }
            });
        } else {
            this.resetBookState('Just type something and I will do my best!');
        }
    }

    resetBookState = (msg) => {
        this.setState(() => ({
            booksSearched: [],
            errMessage: msg
        })); 
    }

    moveBook = (book, shelf) => {
        this.props.onMoveBook(book, shelf);
    }

    render () {
        const { query, booksSearched, errMessage } = this.state;
        const { books } = this.props;
        const booksSearchedWithShelves = reduceBooksSearched(booksSearched, books);

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        className="close-search" 
                        to='/'
                    >Close</Link>

                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/gugol2/bookshelf-react/blob/master/SEARCH_TERMS.md
    
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
                        {booksSearchedWithShelves.map(book => (
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