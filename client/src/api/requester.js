async function requester(method, url, data) {
    const options = {};

    // Add method if not GET
    if (method !== 'GET') {
        options.method = method;
    }

    // Add headers and body if there's data
    if (data) {
        options.headers = {
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(data);
    }

    // Optionally add auth token
    const token = localStorage.getItem('authToken');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }

        const result = await response.json();
        return result;

    } catch (err) {
        console.error('Error in requester:', err.message);
        throw err;
    }
}

// Reusable methods
export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');