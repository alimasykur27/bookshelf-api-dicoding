const {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler,
} = require('./handlers');

const routes = [
    {
        // This is the route for the POST request to adding books
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        // This is the route for the GET request to get all books
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        // This is the route for the GET request to get a book by ID
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        // This is the route for the PUT request to update a book by ID
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookByIdHandler,
    },
    {
        // This is the route for the DELETE request to delete a book by ID
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;
