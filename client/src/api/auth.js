export const isLoggedIn = () => {
    return !!localStorage.getItem("token"); // Check if token exists
  };
  export const getLoggedInUserId = () => {
    const user = localStorage.getItem("user"); // assuming you store user object
    return user ? JSON.parse(user)._id : null;
  };