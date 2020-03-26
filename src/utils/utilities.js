const addShelvedToSearchedBook = (booksFromSearch, booksFromProps) => {
    let shelvedBooksWithImages = [];
    let booksFromSearchCleaned = booksFromSearch;
                
    booksFromSearch.forEach(bwi => {
        const found = booksFromProps.find(book => book.id === bwi.id);
        if(found) {
            booksFromSearchCleaned = booksFromSearchCleaned.filter(b => b.id !== bwi.id);
            shelvedBooksWithImages.push(found);
        }
    });

    return [...booksFromSearchCleaned, ...shelvedBooksWithImages];
}

const filterOutBooksWithoutImages = (bookList) => {
    return bookList.filter(book => book.imageLinks);
} 

const orderBooksbyId = (bookList) => {
    return bookList.sort((a,b) => a.id.localeCompare(b.id));
}

export const reduceBooksSearched = (booksFromSearch, booksFromProps) => {
    const booksWithImages = filterOutBooksWithoutImages(booksFromSearch);

    const shelvedBooksWithImages = addShelvedToSearchedBook(booksWithImages, booksFromProps);

    return shelvedBooksWithImages.length ? orderBooksbyId(shelvedBooksWithImages) : orderBooksbyId(booksWithImages);
}