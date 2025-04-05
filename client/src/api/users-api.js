import { get, post, put } from './requester';

const baseUrl = 'http://localhost:3030/jsonstore/users';

// Get all users
export function getAllUsers() {
    return get(baseUrl);
}

// Get a user by ID
export function getUserById(userId) {
    return get(`${baseUrl}/${userId}`);
}

// Register a new user
export function registerUser(userData) {
    return post(baseUrl, userData);
}

// Update user info
export function updateUser(userId, updatedData) {
    return put(`${baseUrl}/${userId}`, updatedData);
}

// Log in user
export async function loginUser(credentials) {
    try {
        const response = await post(`${baseUrl}/login`, credentials);

        if (response) {
            // Assuming the response contains user data
            const { userId, username } = response;
            // Store user data in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
            return response;  // Return user data or a success message
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Failed to log in');
    }
}