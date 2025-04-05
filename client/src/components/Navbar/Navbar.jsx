import { NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../api/auth";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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

        {!isLoggedIn() ? (
          <>
          <li>
              <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
                Users
              </NavLink>
            </li>
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
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
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