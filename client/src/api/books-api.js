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

export function createBook(bookData){
    return post(`${baseUrl}`, bookData);
}

export const deleteBook = (bookId) => del(`${baseUrl}/${bookId}`);

export const addToShelf = async (userId, bookId) => {
    try {
      const userData = await get(`${authUrl}/${userId}`);
      const currentShelf = userData.shelf || [];
      const updatedShelf = [...currentShelf, { bookId }];
      return await patch(`${authUrl}/${userId}`, { shelf: updatedShelf });
    } catch (err) {
      console.error('Failed to add to shelf:', err);
      throw new Error('Failed to add book to shelf');
    }
  };
  
  // Remove bookId from shelf array
  export const removeFromShelf = async (userId, bookId) => {
    try {
      const userData = await get(`${authUrl}/${userId}`);
      const updatedShelf = (userData.shelf || []).filter(item => item.bookId !== bookId);
      return await patch(`${authUrl}/${userId}`, { shelf: updatedShelf });
    } catch (err) {
      console.error('Failed to remove from shelf:', err);
      throw new Error('Failed to remove book from shelf');
    }
  };