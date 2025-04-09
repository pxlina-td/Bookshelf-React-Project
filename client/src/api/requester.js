async function requester(method, url, data) {
    const options = {};

    const accessToken = localStorage.getItem('accessToken');

    // Include the token only for methods that require authorization
    if (accessToken && (method !== 'GET' || url.includes('/users/me'))) {
        options.headers = {
            ...options.headers,
            'X-Authorization': accessToken,
        };
    }

    if (method !== 'GET') {
        options.method = method;
    }

    if (data) {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    let result;
    const contentType = response.headers.get('Content-Type');

    // Only try to parse as JSON if there's something to parse
    if (contentType && contentType.includes('application/json')) {
        result = await response.json();
    } else {
        result = null;
    }

    if (!response.ok) {
        console.error("Error Response: ", result);
        throw result || { code: response.status, message: response.statusText };
    }

    return result;
}

export const patch = requester.bind(null, 'PATCH');
export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');
