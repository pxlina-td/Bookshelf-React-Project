import { get, post, put, del} from "./requester";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    const authData =await post(`${baseUrl}/login`, {email, password});
    return authData;
}

export const register = (userData) => post(`${baseUrl}/register`, userData);
