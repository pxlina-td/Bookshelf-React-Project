import { useContext } from "react";
import { login, register } from "../api/auth-api";
import { AuthContext } from "../contexts/authContext";

export const useLogin = () => {
    const {changeAuthState} = useContext(AuthContext);

    const loginHandler = async (email, password) => {
            const { password: _, ...authData } = await login(email, password);
            changeAuthState(authData);
            return authData;
    }

    return loginHandler;
}

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (email, password, name, profilepic, bio) => {
        const userData = { email, password, name, profilepic, bio }; // Wrap fields in an object
        const { password: _, ...authData } = await register(userData); 
        changeAuthState(authData);
        return authData;
    }

    return registerHandler;
}

export const handleLogout = async () => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) return;
  
    try {
      await fetch('/users/logout', {
        method: 'GET',
        headers: {
          'X-Authorization': token,
        },
      });
  
      sessionStorage.removeItem('accessToken');
      navigate('/login');  // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };