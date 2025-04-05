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
