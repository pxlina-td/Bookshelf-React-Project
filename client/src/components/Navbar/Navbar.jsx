import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import {handleLogout} from "../../hooks/useAuth";

export default function Navbar() {
  const { userId, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <img src="/assets/images/circle-logo.png" alt="Logo" />
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalog" className={({ isActive }) => (isActive ? "active" : "")}>
            Catalog
          </NavLink>
        </li>

        {!isAuthenticated ? (
          <>
            <li>
              <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                Log in
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={`/profile/${userId}`} className={({ isActive }) => (isActive ? "active" : "")}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={handleLogout}>Log out</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}