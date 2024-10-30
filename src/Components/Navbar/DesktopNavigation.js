import React from "react";
import Navlinks from "./Navlinks.js";
import "./Navbar.css";
import { Fade } from "react-awesome-reveal";
import NavbarScroll from "../NavbarScroll.js";
import { Link, useLocation } from "react-router-dom";

function DesktopNavigation() {
  const location = useLocation(); // useLocation hook to access the current path

  NavbarScroll("navbar-desktop");

  // Function to handle logo click
  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault(); // Prevent the default navigation
      window.location.reload(); // Reload the page
    }
  };

  return (
    <div className="navbar" id="navbar-desktop">
      <nav className="DesktopNavigation">
        <Fade direction="down" triggerOnce={true}>
          <div className="logo">
            <Link to="/" onClick={handleLogoClick}>
              <img src="images/logo.svg" alt="logo" width="50" height="50" />
            </Link>
          </div>
          <Navlinks />
        </Fade>
      </nav>
    </div>
  );
}

export default DesktopNavigation;
