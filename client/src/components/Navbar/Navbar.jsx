import { Link } from "react-router-dom";
import "./Navbar.css"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src="https://www.svgrepo.com/show/181800/library-book.svg" alt="Logo" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}
