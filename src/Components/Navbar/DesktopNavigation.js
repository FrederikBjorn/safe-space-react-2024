import React, { useEffect, useState } from "react";
import NavlinksAfterLogin from "./NavlinksAfterLogin.js";
import NavlinksBeforeLogin from "./NavlinksBeforeLogin.js";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function DesktopNavigation() {
  const location = useLocation();
  const [authenticatedUser, setAuthenticatedUser] = useState(false); // assuming false means not authenticated

  // Check if the user is authenticated or based on path
  useEffect(() => {
    // You can update this based on your auth logic
    if (location.pathname === "/") {
      setAuthenticatedUser(false);
    } else {
      setAuthenticatedUser(true);
    }
  }, [location]);

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
        {authenticatedUser ? <NavlinksAfterLogin /> : <NavlinksBeforeLogin />}
      </nav>
    </div>
  );
}

export default DesktopNavigation;
