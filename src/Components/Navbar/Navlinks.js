import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navlinks({ isClicked, closeMenu }) {
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
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navlinks;
