const mergeBooksFromPropsWithSearchedBooks = (booksFromSearch, booksFromProps) => {
    const shelvedBooks = booksFromSearch.reduce((acc, cur) => {
        const found = booksFromProps.find(b => b.id === cur.id);
        if(found){
            return [...acc, found];
        } else {
            return [...acc, cur]
        }
    }, []);

    return shelvedBooks;
}

const filterOutBooksWithoutImages = (bookList) => {
    return bookList.filter(book => book.imageLinks);
} 

const orderBooksbyId = (bookList) => {
    return bookList.sort((a,b) => a.id.localeCompare(b.id));
}

export const reduceBooksSearched = (booksFromSearch, booksFromProps) => {
    const filteredBooks = filterOutBooksWithoutImages(booksFromSearch);
    const filteredAndMergedBooks = mergeBooksFromPropsWithSearchedBooks(filteredBooks, booksFromProps);

    return orderBooksbyId(filteredAndMergedBooks);
}

export const splitBooksInShelves = (bookList) => {
    
    const shelves = bookList.reduce((acc, cur) => {
        acc[cur.shelf] = [...acc[cur.shelf] || [], cur];
        return acc
    }, {});
    
    return shelves;
} 
