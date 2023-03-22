const {
    addBookHandler,
    getAllBooksHandler,
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
];

module.exports = routes;
