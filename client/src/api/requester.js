async function requester(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    const accessToken = localStorage.getItem('accessToken');

    // Don't add token for public auth endpoints or book-related endpoints
    const isPublic =
        url.includes('/users/register') ||
        url.includes('/users/login') ||
        url.includes('/data/books');  // Exclude books from requiring the token

    if (!isPublic && accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    let result;
    const contentType = response.headers.get('Content-Type');

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
