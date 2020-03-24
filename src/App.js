import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Search } from './Search';
import { Library } from './Library';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  onShowLibraryPage = () => {
    this.setState((currentState) => ({
      showSearchPage: !currentState.showSearchPage
    }));
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search onShowLibraryPage={this.onShowLibraryPage}/>
        ) : (
          <Library onShowLibraryPage={this.onShowLibraryPage}/>
        )}
      </div>
    )
  }
}

export default BooksApp
