import { useContext } from "react";
import { login, register } from "../api/auth-api";
import { AuthContext } from "../contexts/authContext";

export const useLogin = () => {
    const {changeAuthState} = useContext(AuthContext);

    const loginHandler = async (email, password) => {
            const { password: _, ...authData } = await login(email, password);
            changeAuthState(authData);
            return result;
    }

    return loginHandler;
}

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (email, password, name, profilepic, bio) => {
        const { password: _, ...authData } = await register(email, password, name, profilepic, bio);
        changeAuthState(authData);
        return result;
    }

    return registerHandler;
}