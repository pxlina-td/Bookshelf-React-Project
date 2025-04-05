import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Catalog from "./components/Catalog/Catalog";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import UsersPage from "./components/UsersPage/UsersPage";


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
