import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src="/assets/images/circle-logo.png" alt="Logo" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Log in</Link></li>
        <li><Link to="/logout">Log out</Link></li>
      </ul>
    </nav>
  );
}
