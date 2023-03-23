const {nanoid} = require('nanoid');

const books = require('./books');

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    // Cek apakah name kosong
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    // Cek apakah readPage lebih besar dari pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    // cek apakah buku berhasil ditambahkan
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    // Jika gagal
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllBooksHandler = (request, h) => {
    // parsing query
    const {name, reading, finished} = request.query;

    // jika tidak ada query sama sekali
    if (name === undefined && reading === undefined && finished === undefined) {
        const response = h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }

    // jika ada query name
    if (name !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                books: books
                    .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
                    .map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
            },
        });
        response.code(200);
        return response;
    }

    // jika ada query reading
    if (reading !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                books: books
                    .filter((book) => Number(book.reading) === Number(reading))
                    .map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
            },
        });
        response.code(200);
        return response;
    }

    // jika ada query finished
    if (finished !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                books: books
                    .filter((book) => Number(book.finished) === Number(finished))
                    .map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
            },
        });
        response.code(200);
        return response;
    }
};

const getBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

    const book = books.filter((n) => n.id === bookId)[0];

    if (book !== undefined) {
        // Jika id ada di dalam array
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }

    // Jika id tidak ada di dalam array
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const updateBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    // cek apakah name kosong
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    // cek apakah readPage lebih besar dari pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    // cek apakah id yang akan diupdate ada di dalam array
    const index = books.findIndex((book) => book.id === bookId);

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();

    // Jika id ada di dalam array
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    // Jika id tidak ada di dalam array
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

    // cek apakah id yang akan dihapus ada di dalam array
    const index = books.findIndex((book) => book.id === bookId);

    // Jika id ada di dalam array
    if (index !== -1) {
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    // Jika id tidak ada di dalam array
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler,
};
