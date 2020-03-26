const addShelvedToSearchedBook = (booksFromSearch, booksFromProps) => {
    
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
    const booksWithImages = filterOutBooksWithoutImages(booksFromSearch);

    const shelvedBooksWithImages = addShelvedToSearchedBook(booksWithImages, booksFromProps);

    return shelvedBooksWithImages.length ? orderBooksbyId(shelvedBooksWithImages) : orderBooksbyId(booksWithImages);
}