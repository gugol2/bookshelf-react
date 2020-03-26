import React from 'react';
import { Book } from './Book';
import * as BooksAPI from './BooksAPI';

export class Search extends React.Component {
    state = {
        query: '',
        booksSearched: []
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
        BooksAPI.search(query).then(booksSearched => {
            if(booksSearched.error) {
                this.resetBookState();
                console.log(`The error is: ${booksSearched.error}`);
            } else {
                const booksWithImages = this.filterOutBooksWithoutImages(booksSearched);

                let newBooksWithImages = [];
                
                booksWithImages.forEach(bwi => {
                    const found = this.props.books.find(book => book.id === bwi.id);
                    if(found) {
                        newBooksWithImages = booksWithImages.filter(b => b.id !== bwi.id);
                        newBooksWithImages.push(found);
                    }
                });
                
                this.setState(() => ({
                    booksSearched: newBooksWithImages.length ?  this.orderBooks(newBooksWithImages) : this.orderBooks(booksWithImages)
                }));
            }
        })
    }

    orderBooks = (books) => {
        return books.sort((a,b) => a.id.localeCompare(b.id));
    }

    resetBookState = () => {
        this.setState(() => ({
            booksSearched: []
        })); 
    }
 
    filterOutBooksWithoutImages = (bookList) => {
        return bookList.filter(book => book.imageLinks);
    } 

    moveBook = (book, shelf) => {
        this.props.onMoveBook(book, shelf);
    }

    render () {
        const { onToggleView } = this.props;
        const { query, booksSearched } = this.state;
        console.log('booksSearched', booksSearched);

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
            </div>
        )
    }
}