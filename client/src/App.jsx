import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Catalog from "./components/Catalog/Catalog";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState } from "react";
import { AuthContext } from "./contexts/authContext";
import BookDetails from "./components/Catalog/BookList/BookDetails/BookDetails";


function App() {
  const [authState, setAuthState] = useState(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      // You could also decode the token to retrieve user info like email, etc.
      return { accessToken: storedToken};  // Example, adjust according to your data
    }
    return {};
  });

  const changeAuthState = (state) => {
    localStorage.setItem('accessToken', state.accessToken);
    setAuthState(state);
  }
  const contextData = {
    userID: authState._id,
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState
  }

  return (
    <>
      <AuthContext.Provider value={contextData}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:bookId" element={<BookDetails/>} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;
