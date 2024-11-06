import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navlinks({ isClicked, closeMenu }) {
  return (
    <nav className="navlinks">
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/loginProfessionalUser">Therapist Log in</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/loginPatientUser">Patient Log in</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navlinks;
