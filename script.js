const myLibrary = [];

function Book(id, title, author, pages, read) {
    if(!new.target) {
    throw new Error("Use 'new' keyword to create a book");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 224, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 193, false);

console.table(myLibrary);

function displayBooks() {
    const containerElement = document.querySelector('.container');
    while (containerElement.firstChild) {
        containerElement.removeChild(containerElement.firstChild);
    }

    myLibrary.forEach((book) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const titleElement = document.createElement('h2');
        titleElement.classList.add('title');
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.classList.add('author');
        authorElement.textContent = book.author;

        const pagesElement = document.createElement('p');
        pagesElement.classList.add('pages');
        pagesElement.textContent = book.pages;

        const readElement = document.createElement('p');
        readElement.classList.add('read');
        readElement.textContent = book.read;

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(pagesElement);
        bookElement.appendChild(readElement);

        containerElement.appendChild(bookElement);
    })
}

displayBooks();