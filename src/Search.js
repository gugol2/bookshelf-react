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

    updateQuery = (event) => {
        event.preventDefault();
        const query = event.target.value;

        this.setState(() => ({
            query: query
        }));

        BooksAPI.search(query).then(booksSearched => {
            if(booksSearched.error) {
                this.setState(() => ({
                    booksSearched: []
                })); 
            } else {
                debugger;
                const booksWithImages = booksSearched.filter(book => book.imageLinks);

                let newBooksWithImages = [];
                
                booksWithImages.forEach(bwi => {
                    const found = this.props.books.find(book => book.id === bwi.id);
                    if(found) {
                        newBooksWithImages = booksWithImages.filter(b => b.id !== bwi.id);
                        newBooksWithImages.push(found);
                    }
                });
                
                this.setState(() => ({
                    booksSearched: newBooksWithImages.length ?  newBooksWithImages : booksWithImages
                }));
            }
        }).catch(error => {
            this.setState(() => ({
                booksSearched: []
            })); 
        })
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