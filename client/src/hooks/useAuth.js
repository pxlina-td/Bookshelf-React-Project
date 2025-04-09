import { useContext } from "react";
import { login, register } from "../api/auth-api";
import { AuthContext } from "../contexts/authContext";

export const useLogin = () => {
    const {changeAuthState} = useContext(AuthContext);

    const loginHandler = async (email, password) => {
            const { password: _, ...authData } = await login(email, password);
            console.log("Auth Data from login:", authData);
            changeAuthState(authData);
            return authData;
    }

    return loginHandler;
}

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (email, password, name, profilepic, bio, shelf) => {
        const userData = { email, password, name, profilepic, bio, shelf: shelf || [] }; // Wrap fields in an object
        const { password: _, ...authData } = await register(userData); 
        changeAuthState(authData);
        return authData;
    }

    return registerHandler;
}
