import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function NavlinksBeforeLogin({ isClicked, closeMenu }) {
  return (
    <nav className="navlinks">
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavlinksBeforeLogin;
