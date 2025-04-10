import { get, post, put, del} from "./requester";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    const authData =await post(`${baseUrl}/login`, {email, password});
    return authData;
}

export const register = (userData) => post(`${baseUrl}/register`, userData);

export const getMe = () => get(`${baseUrl}/me`);

export async function updateUser(data) {
    const accessToken = localStorage.getItem('accessToken'); // Get the token from localStorage
    if (!accessToken) {
        throw new Error('No access token found, user might not be logged in');
    }

    const res = await fetch('http://localhost:3030/users/me', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken // Send the token with the request
        },
        credentials: 'include', // Important for authentication!
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update user');
    }

    return await res.json();
}