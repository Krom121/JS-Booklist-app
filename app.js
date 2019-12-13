// Book Class represents a book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class handles UI tasks
class UI {

    static displayBooks(){
        const StoreBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '3434434'
            },
            {
                title: 'Book Two',
                author: 'Steve Doe',
                isbn: '3434434'
            }
        ];

        const books = StoreBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // removes after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2500);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class handles logic for local storage

// Events to display a book in the list
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Event to add a book in the list
document.querySelector('#book-form').addEventListener('submit', (e) => {
    
    // prevent default action
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === '') {
       UI.showAlert('Please fill in all the fields', 'danger');
    } else {
        // Instatiate a book
        const book = new Book(title, author, isbn);

        // Add book to list
        UI.addBookToList(book);

        // Successfully added a book alert
        UI.showAlert('Your book has been added', 'success');

        // Clear fields
        UI.clearFields();
    }

});

// Event to delete a book from the list
 document.querySelector('#book-list').addEventListener('click', (e) => {
    
    UI.deleteBook(e.target);

    // Successfully deleted a book alert
     UI.showAlert('Your book has been deleted', 'success');
 });