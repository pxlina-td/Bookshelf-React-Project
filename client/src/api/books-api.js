import { get, post, put, patch, del } from './requester';

const baseUrl = 'http://localhost:3030/data/books';

const authUrl = 'http://localhost:3030/users';

export const getAllBooks = async () => {
    const relations = 'owner:_ownerId(users)';
    const encoded = encodeURIComponent(relations);

    const result = await get(baseUrl, null, {
        load: encoded
    });

    const books = Object.values(result);
    return books;
};

// Get one book
export function getBookById(bookId) {
    return get(`${baseUrl}/${bookId}`);
}

export function createBook(bookData) {
    return post(`${baseUrl}`, bookData);
}

export const deleteBook = (bookId) => del(`${baseUrl}/${bookId}`);

export const update = (bookId, bookData) => put(`${baseUrl}/${bookId}`, bookData);
