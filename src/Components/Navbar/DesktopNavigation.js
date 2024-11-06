import React from "react";
import NavlinksAfterLogin from "./NavlinksAfterLogin.js";
import NavlinksBeforeLogin from "./NavlinksBeforeLogin.js";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function DesktopNavigation(authenticatedUser) {
  const location = useLocation();

  // Function to handle logo click
  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <div className="navbar" id="navbar-desktop">
      <nav className="DesktopNavigation">
        <div className="logo">
          <Link to="/" onClick={handleLogoClick}>
            <img src="images/icon.png" alt="logo" width="100" height="90" />
          </Link>
        </div>
        {authenticatedUser ? <NavlinksBeforeLogin /> : <NavlinksAfterLogin />}
      </nav>
    </div>
  );
}

export default DesktopNavigation;
