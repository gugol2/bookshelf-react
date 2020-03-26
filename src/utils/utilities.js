export const addShelvedToSearchedBook = (booksFromSearch, booksFromProps) => {
    let newBooksWithImages = [];
                
    booksFromSearch.forEach(bwi => {
        const found = booksFromProps.find(book => book.id === bwi.id);
        if(found) {
            newBooksWithImages = booksFromSearch.filter(b => b.id !== bwi.id);
            newBooksWithImages.push(found);
        }
    });

    return newBooksWithImages;
}

export const filterOutBooksWithoutImages = (bookList) => {
    return bookList.filter(book => book.imageLinks);
} 

export const orderBooksbyId = (bookCollection) => {
    return bookCollection.sort((a,b) => a.id.localeCompare(b.id));
}