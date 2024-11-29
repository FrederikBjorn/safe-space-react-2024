import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useUserLogOut } from "../Authentication/useUserLogOut";

function NavlinksAfterLogin({ isClicked, closeMenu }) {
  const { userLogOut } = useUserLogOut();
  const handleLogout = async () => {
    await userLogOut();
    if (isClicked) {
      closeMenu();
    }
  };

  return (
    <nav className="navlinks">
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="">Home</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/chatpage">Chat</Link>
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
          <Link>Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavlinksAfterLogin;
