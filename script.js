const myLibrary = [];

function Book(id, title, author, pages, read, imageUrl) {
    if(!new.target) {
    throw new Error("Use 'new' keyword to create a book");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.imageUrl = imageUrl;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function displayBooks() {
    const containerElement = document.querySelector('.container');
    while (containerElement.firstChild) {
        containerElement.removeChild(containerElement.firstChild);
    }

    myLibrary.forEach((book) => {
        const bookElement = document.createElement('div');
        bookElement.setAttribute('data-id', book.id);
        bookElement.classList.add('book');

        const imageElement = document.createElement('img');
        imageElement.classList.add('book-image');
        imageElement.src = book.imageUrl;
        imageElement.alt = `${book.title} cover`;

        if (book.read) {
            const readStatusElement = document.createElement('span');
            readStatusElement.classList.add('read-status');
            readStatusElement.innerHTML = '✔️';
            readStatusElement.title = 'Read';
            bookElement.appendChild(readStatusElement);
        }

        const titleElement = document.createElement('h2');
        titleElement.classList.add('title');
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.classList.add('author');
        authorElement.textContent = book.author;

        const pagesElement = document.createElement('p');
        pagesElement.classList.add('pages');
        pagesElement.textContent = `${book.pages} pages`;

        const toggleReadButtonElement = document.createElement('button');
        toggleReadButtonElement.classList.add('toggle-read');
        toggleReadButtonElement.textContent = book.read ? 'Read' : 'Not Read';
        toggleReadButtonElement.addEventListener('click', (e) => {
            book.toggleRead();
            displayBooks();
        });

        const removeButtonElement = document.createElement('button');
        removeButtonElement.classList.add('remove');
        removeButtonElement.textContent = 'Remove';
        removeButtonElement.addEventListener('click', (e) => {
            removeBook(bookElement.dataset.id);
        });

        bookElement.appendChild(imageElement);
        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(pagesElement);
        bookElement.appendChild(toggleReadButtonElement);
        bookElement.appendChild(removeButtonElement);
        containerElement.appendChild(bookElement);
    })
}

function addBookToLibrary(title, author, pages, read, imageUrl) {
    const id = crypto.randomUUID();
    const intPages = parseInt(pages);
    const book = new Book(id, title, author, intPages, read, imageUrl);
    myLibrary.push(book);
    displayBooks();
}

function removeBook(id) {
    const index = myLibrary.findIndex((book) => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    displayBooks();
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true, "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg");
addBookToLibrary("1984", "George Orwell", 328, false, "https://upload.wikimedia.org/wikipedia/commons/5/51/1984_first_edition_cover.jpg?20230923071852");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/640px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg");

displayBooks();

const dialogElement = document.querySelector('dialog.new-book');

const showNewBookModalButton = document.querySelector('button.new-book');
showNewBookModalButton.addEventListener('click', (e) => {
    dialogElement.showModal();
});

const formElement = document.querySelector('form.new-book');
formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formElement);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read') === 'true';
    const imageUrl = formData.get('imageUrl');

    addBookToLibrary(title, author, pages, read, imageUrl);
    dialogElement.close();
});

const closeButton = document.querySelector('button.close');
closeButton.addEventListener('click', (e) => {
    dialogElement.close();
});