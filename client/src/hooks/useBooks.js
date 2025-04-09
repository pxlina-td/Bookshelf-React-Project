import { useEffect, useState } from "react";
import { createBook, getBookById } from "../api/books-api";

export function useGetOneBook(bookId){
    const [book, setBook] = useState({});

    useEffect(() => {
        (async () => {
            const result = await getBookById(bookId);
            setBook(result);
        })();
    }, [bookId]);

    return { book, setBook }; // Return an object here instead of an array
}

export function useCreateBook(){
    const bookCreateHandler = (bookData) => createBook(bookData);
    return bookCreateHandler;
}

export function useDeleteBook(){

}

