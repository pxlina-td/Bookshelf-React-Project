import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, userId }) {
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

        {!isLoggedIn ? (
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
              <NavLink to="/logout">Log out</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
