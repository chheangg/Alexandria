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
let statusBtn = document.querySelectorAll('.status');
let removeBtn = document.querySelectorAll('.remove-content');;
let id = 0;

btn.addEventListener('click', () => {
    form.style.cssText = "display: flex;"
})

closebtn.addEventListener('click', () => {
    form.style.cssText = "display: none;"
})

submit.addEventListener('click', () => {
    if (!bookName.value || !bookAuthor.value || !bookPage.value) {
        return;
    }
    let status;
    for (i = 0; i < bookStatus.length; i++) {
        if (bookStatus[i].checked) {
            status = bookStatus[i];
            break;
        }
    }
    runInput(bookName.value , bookAuthor.value, bookPage.value, bookGenre.value , status.value, id)
    form.style.cssText = "display: none;"
    bookName.value = '';
    bookAuthor.value = '';
    bookPage.value = '';
    bookGenre.value = '';
    bookStatus.value = '';
    id++;
    removeBtn.forEach((button) => {
        button.addEventListener('click', removeContent);
    })
    statusBtn.forEach((button) => {
        button.addEventListener('click', changeStatus);
    })
})

// Change the status button's content and array
function changeStatus(button) {
    if (button.target.classList.contains('not-read')) {
        myLibrary.forEach((book) => {
            if ( book.id == button.target.getAttribute('data-key')) {
                book.status =  "Read"
            }
        })
        let content = document.querySelector(`.status-${button.target.getAttribute('data-key')}`);
        content.textContent = "Read";
         button.target.classList.remove('not-read');
         button.target.classList.add('read');
    } else {
        myLibrary.forEach((book) => {
            if ( book.id == button.target.getAttribute('data-key')) {
                book.status =  "Not Read"
            }
        })
        let content = document.querySelector(`.status-${button.target.getAttribute('data-key')}`);
        content.textContent = "Not Read";
        button.target.classList.remove('read');
        button.target.classList.add('not-read'); 
    }
}

// Removes content from both the array and the page using data-key.
function removeContent(button) {
    myLibrary.forEach((book) => {
        if ( book.id == button.target.getAttribute('data-key')) {
            container.removeChild(document.querySelector(`span[data-key="${book.id}"]`));
            myLibrary.splice(myLibrary.indexOf(book), 1 );
        }
    })
} 

class book {
    constructor(name, author, page, genre, status, id) {
        this.name = name;
        this.author = author;
        this.page = page;
        this.genre = genre;
        this.status = status;
        this.id = id;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Runs a loop on the myLibrary array to see if there's any book. Pass the each array (that is an object)
// to a nested loop that create elements and append them to the container
function displayBook(library) {
            // Create a remove button
        let removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', 'remove-content');

        let book = library[library.length-1];
        let bookContainer = document.createElement('span');
        bookContainer.classList.add('book-container');
        for ( detail in book ) {
            if ( detail == 'id') {
                    bookContainer.setAttribute('data-key', id);
                continue;
            }
            // creation of elements
            let bookAttribute = document.createElement('span');
            let bookDetail = document.createElement('span');
            let bookLabel;
            if ( detail !== 'status' ) {
                bookLabel = document.createElement('span');
            } else {
                bookLabel = document.createElement('button');
                bookLabel.setAttribute('data-key', id);             
            }

            // change value of true or false to another string
            if ( book[detail] === 'true' ) {
                book[detail] = "Read";
                bookLabel.setAttribute('class', 'read');
            } else if ( book[detail] === 'false' ) {
                book[detail] = "Not read";
                bookLabel.setAttribute('class', 'not-read');
            }

            // add class to each created element
            bookAttribute.classList.add(`${detail}`);

            // add labels to each book's detail except for the book's name
            if (!(detail == 'name')) {
                bookLabel.classList.add('book-label');
                bookLabel.textContent = `${detail}`;
                bookAttribute.appendChild(bookLabel);
            }

            // now, add text to the book's detail and append them to show up on the page
            if (!(detail == 'status')) {
                bookDetail.classList.add('book-content');
            } else {
                bookDetail.classList.add('book-content', `status-${id}`);              
            }
            bookDetail.textContent = book[detail];
            bookAttribute.appendChild(bookDetail);

            bookContainer.appendChild(bookAttribute);
            
            if ( detail == 'name') {
                bookAttribute.appendChild(removeBtn);
                removeBtn.setAttribute('data-key', id);
            }

        }
        container.appendChild(bookContainer);

    
}

function runInput(name, author, page, genre, read) {
    let newBook = new book(name, author, page, genre, read, id);
    addBookToLibrary(newBook);
    displayBook(myLibrary);
    removeBtn = document.querySelectorAll('.remove-content');
    statusBtn = document.querySelectorAll('.status');
}

function personFactory(name, age) {
    const sayHello = () => console.log("Hi!");
    return {
        name,
        age,
        sayHello,
    }
}

let pete = personFactory("Pete", 22)