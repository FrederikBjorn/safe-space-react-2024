import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import useAuth

function NavlinksAfterLogin({ isClicked, closeMenu }) {
  const { setAuthenticatedUser } = useAuth();

  const handleLogout = () => {
    setAuthenticatedUser(null);
    if (isClicked) {
      closeMenu();
    }
  };

  return (
    <nav className="navlinks">
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Chat</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Diary</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Calendar</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Exercises</Link>
        </li>
        <li onClick={handleLogout}>
          <Link to="/">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavlinksAfterLogin;
