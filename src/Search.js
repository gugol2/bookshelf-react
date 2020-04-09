import React, { useState, useEffect } from 'react';
import { Book } from './Book';
import * as BooksAPI from './BooksAPI';
import { reduceBooksSearched, filterOutBooksWithoutImages } from "./utils/utilities";
import { Link } from 'react-router-dom';

export const Search = (props) =>  {
    const [query, setQuery] = useState('');
    const [booksSearched, setBooksSearched] = useState([]);
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        // The callback from traditional this.setState goes here
        const timeout = debounce(updateSearch, 500)(query);
        
        return () => {
            // Every time the query changes React cleans up effects from the previous render before running the effects next time.
            // So this function returned is called before running the next effect.
            clearTimeout(timeout);
        };

    }, [query]);

    const debounce = (fn, wait) => {
        return (...args) => {
            const functionCall = () => fn.apply(this, args);
        
            // clearTimeout(timeout);
            return setTimeout(functionCall, wait);
        }
    };

    const updateQuery = (event) => {
        event.preventDefault();
        const query = event.target.value;

        setQuery(query.trim().length ? query : '');
        setErrMessage('');
    }

    const updateSearch = (query) => {
        if(query){
            BooksAPI.search(query).then(booksSearched => {
                if(booksSearched.error) {
                    resetBookState('No books found!');
                    console.log(`The error is: ${booksSearched.error}`);
                } else {
                    setBooksSearched(filterOutBooksWithoutImages(booksSearched));
                }
            });
        } else {
            resetBookState('Just type something and I will do my best!');
        }
    }

    const resetBookState = (msg) => {
        setBooksSearched([]);
        setErrMessage(msg)
    };

    const moveBook = (book, shelf) => {
        props.onMoveBook(book, shelf);
    };

    const { books } = props;
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
                        onChange={updateQuery}  
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
                                moveBook={moveBook}
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