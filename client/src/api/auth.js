export const isLoggedIn = () => {
    return !!localStorage.getItem("token"); // Check if token exists
  };