import { get, post, put, del } from './requester';

const baseUrl = 'http://localhost:3030/data/books';

// Get all books
export const  getAllBooks = async () => {
    const result = await get(baseUrl);
    const books = Object.values(result);
    return books;
}

// Get one book
export function getBookById(bookId) {
    return get(`${baseUrl}/${bookId}`);
}

export function createBook(bookData){
    return post(`${baseUrl}`, bookData);
}
