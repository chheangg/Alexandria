let myLibrary = [];
let container = document.querySelector('.content-container');
let form = document.querySelector('.form-overlay');
let btn = document.querySelector('.create-form-button');
let closebtn = document.querySelector('.close')
let submit = document.querySelector('.submit')
let bookName = document.querySelector('#name')
let bookPage = document.querySelector('#page')
let bookAuthor = document.querySelector('#author')
let bookGenre = document.querySelector('#genre')
let bookStatus = document.getElementsByName('status');

btn.addEventListener('click', () => {
    form.style.cssText = "display: flex;"
})

closebtn.addEventListener('click', () => {
    form.style.cssText = "display: none;"
})

submit.addEventListener('click', () => {
    let status;
    for (i = 0; i < bookStatus.length; i++) {
        if (bookStatus[i].checked) {
            status = bookStatus[i];
            break;
        }
    }
    runInput(bookName.value , bookAuthor.value, bookPage.value, bookGenre.value , status.value)
    form.style.cssText = "display: none;"
    bookName.value = '';
    bookAuthor.value = '';
    bookPage.value = '';
    bookGenre.value = '';
    bookStatus.value = '';
})

function book(name, author, page, genre, status) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.genre = genre;
    this.status = status;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Runs a loop on the myLibrary array to see if there's any book. Pass the each array (that is an object)
// to a nested loop that create elements and append them to the container
function displayBook(library) {
        let book = library[library.length-1];
        let bookContainer = document.createElement('div');
        bookContainer.classList.add('book-container');
        for ( detail in book ) {
            let bookAttribute = document.createElement('span');
            let bookDetail = document.createElement('span');
            let bookLabel = document.createElement('span');

            if ( book[detail] === 'true' ) {
                book[detail] = "Read";
                bookLabel.setAttribute('class', 'read');
            } else if ( book[detail] === 'false' ) {
                book[detail] = "Not read";
                bookLabel.setAttribute('class', 'not-read');
            } 

            bookAttribute.classList.add(`${detail}`);

            if (!(detail == 'name')) {
                bookLabel.classList.add('book-label');
                bookLabel.textContent = `${detail}`;
                bookAttribute.appendChild(bookLabel);
            }

            bookDetail.classList.add('book-content');
            bookDetail.textContent = book[detail];
            bookAttribute.appendChild(bookDetail);

            bookContainer.appendChild(bookAttribute);

        }
        container.appendChild(bookContainer);

    
}

function runInput(name, author, page, genre, read) {
    let newBook = new book(name, author, page, genre, read);
    addBookToLibrary(newBook);
    displayBook(myLibrary);
}