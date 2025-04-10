import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const { changeAuthState } = useContext(AuthContext);

  useEffect(() => {
    // Clear the token
    localStorage.removeItem("accessToken");

    // Set auth state to null (or empty object)
    changeAuthState({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 🚫 Don't include `changeAuthState` if it's not memoized

  return <Navigate to="/" replace />;
}
