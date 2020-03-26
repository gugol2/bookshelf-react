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

const orderBooksbyNameInsideShelves = (orderedShelvesByName) => {
    const shelvesOrdered = {};

    for (let [key, value] of orderedShelvesByName) {
        if(key !== 'none') {
            const newValue = [...value];
            shelvesOrdered[key] = orderBooksbyName(newValue);
        }
    }

    return shelvesOrdered;
}

const orderShelvesByName = (shelves) => {
    const orderedShelvesByName = Object.entries(shelves).sort((a, b) => a[0].localeCompare(b[0]));
    return orderedShelvesByName;
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
    
    const orderedShelvesByName = orderShelvesByName(shelves);

    const shelvesAndBooksOrdered = orderBooksbyNameInsideShelves(orderedShelvesByName);

    return shelvesAndBooksOrdered;
} 
