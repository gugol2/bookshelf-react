const mergeBooksFromPropsWithSearchedBooks = (booksFromSearch, booksFromProps) => {
    const shelvedBooks = booksFromSearch.map(searched => {
        return booksFromProps.find(bfp => bfp.id === searched.id) || searched;
    });

    return shelvedBooks;

}

export const filterOutBooksWithoutImages = (bookList) => {
    return bookList.filter(book => book.imageLinks);
} 

const orderBooksbyName = (bookList) => {
    return bookList.sort((a,b) => a.title.localeCompare(b.title));
}

const orderBooksbyNameInsideShelves = (orderedShelvesByName) => {
    const shelvesOrdered = {};

    for (let [key, value] of orderedShelvesByName) {
        const newValue = [...value];
        shelvesOrdered[key] = orderBooksbyName(newValue);
    }

    return shelvesOrdered;
}

const orderShelvesByName = (shelves) => {
    const orderedShelvesByName = Object.entries(shelves).sort((a, b) => a[0].localeCompare(b[0]));
    return orderedShelvesByName;
}

export const reduceBooksSearched = (booksFromSearch, booksFromProps) => {
    const filteredAndMergedBooks = mergeBooksFromPropsWithSearchedBooks(booksFromSearch, booksFromProps);

    return orderBooksbyName(filteredAndMergedBooks);
}

export const splitBooksInShelves = (bookList) => {
    const booksWithNoneShelf = bookList.filter(book => book.shelf !== 'none');

    const shelves = booksWithNoneShelf.reduce((acc, cur) => {
        acc[cur.shelf] = [...acc[cur.shelf] || [], cur];
        return acc
    }, {});
    
    const orderedShelvesByName = orderShelvesByName(shelves);

    const shelvesAndBooksOrdered = orderBooksbyNameInsideShelves(orderedShelvesByName);

    return shelvesAndBooksOrdered;
} 
