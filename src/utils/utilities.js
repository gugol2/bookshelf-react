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

const orderBooksbyName = (bookList) => {
    return bookList.sort((a,b) => a.title.localeCompare(b.title));
}

const orderBooksbyNameInsideShelves = (shelves) => {
    const shelvesOrdered = {};

    for (let [key, value] of Object.entries(shelves)) {
        if(key !== 'none') {
            const newValue = [...value];
            shelvesOrdered[key] = orderBooksbyName(newValue);
        }
    }

    return shelvesOrdered;
}

export const reduceBooksSearched = (booksFromSearch, booksFromProps) => {
    const filteredBooks = filterOutBooksWithoutImages(booksFromSearch);
    const filteredAndMergedBooks = mergeBooksFromPropsWithSearchedBooks(filteredBooks, booksFromProps);

    return orderBooksbyName(filteredAndMergedBooks);
}

export const splitBooksInShelves = (bookList) => {
    
    const shelves = bookList.reduce((acc, cur) => {
        acc[cur.shelf] = [...acc[cur.shelf] || [], cur];
        return acc
    }, {});
    
    const shelvesOrdered = orderBooksbyNameInsideShelves(shelves);

    return shelvesOrdered;
} 
