import { get, post, put, del } from './requester';

const baseUrl = 'http://localhost:3030/jsonstore/books';

// Get all books
export function getAllBooks() {
    return get(baseUrl);
}

// Get one book
export function getBookById(bookId) {
    return get(`${baseUrl}/${bookId}`);
}

// Add new book
export function createBook(bookData) {
    return post(baseUrl, bookData);
}

// Update a book
export function updateBook(bookId, updatedData) {
    return put(`${baseUrl}/${bookId}`, updatedData);
}

// Delete a book
export function deleteBook(bookId) {
    return del(`${baseUrl}/${bookId}`);
}

// Like a book
export async function likeBook(bookId) {
    const book = await getBookById(bookId);
    const updatedBook = {
        ...book,
        likeCount: (book.likeCount || 0) + 1,
    };
    return updateBook(bookId, updatedBook);
}

// Unlike a book
export async function unlikeBook(bookId) {
    const book = await getBookById(bookId);
    const updatedBook = {
        ...book,
        likeCount: Math.max(0, (book.likeCount || 0) - 1),
    };
    return updateBook(bookId, updatedBook);
}