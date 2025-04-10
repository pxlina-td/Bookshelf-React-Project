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
// Add book to user's shelf (as an array)
async function addToShelf(userId, bookId, token) {
    const userResponse = await fetch(`/data/users/${userId}`, {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    });

    if (!userResponse.ok) {
        console.error('Failed to fetch user data');
        return;
    }

    const user = await userResponse.json();
    // Add the new book ID to the shelf array if it's not already there
    if (!user.shelf.includes(bookId)) {
        user.shelf.push(bookId);

        // Update the user's shelf (PUT request)
        const updateResponse = await fetch(`/data/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                shelf: user.shelf // Update the shelf with the new book
            })
        });

        if (updateResponse.ok) {
            const updatedUser = await updateResponse.json();
            console.log('Book added to shelf:', updatedUser);
            return updatedUser;
        } else {
            console.error('Failed to update user data');
        }
    } else {
        console.log('Book is already on the shelf');
    }
}

// Remove book from user's shelf (as an array)
async function removeFromShelf(userId, bookId, token) {
    const userResponse = await fetch(`/data/users/${userId}`, {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    });

    if (!userResponse.ok) {
        console.error('Failed to fetch user data');
        return;
    }

    const user = await userResponse.json();
    // Remove the book ID from the shelf array
    user.shelf = user.shelf.filter(id => id !== bookId);

    // Update the user's shelf (PUT request)
    const updateResponse = await fetch(`/data/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({
            shelf: user.shelf // Update the shelf without the removed book
        })
    });

    if (updateResponse.ok) {
        const updatedUser = await updateResponse.json();
        console.log('Book removed from shelf:', updatedUser);
        return updatedUser;
    } else {
        console.error('Failed to update user data');
    }
}