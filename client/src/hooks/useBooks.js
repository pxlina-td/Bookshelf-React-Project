import { createBook } from "../api/books-api";

export function useCreateBook(){
    const bookCreateHandler = (bookData) => createBook(bookData);
    return bookCreateHandler;
}