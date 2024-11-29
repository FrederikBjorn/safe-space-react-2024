import React from "react";
import NavlinksAfterLogin from "./NavlinksAfterLogin.js";
import NavlinksBeforeLogin from "./NavlinksBeforeLogin.js";
import "./Navbar.css";
import { useUserStore } from "../UserData/useUserStore.js";

function DesktopNavigation() {
  const { currentUser } = useUserStore();

  return (
    <div className="navbar" id="navbar-desktop">
      <nav className="DesktopNavigation">
        <div className="logo">
          <img src="images/icon.png" alt="logo" width="100" height="90" />
        </div>
        {currentUser ? <NavlinksAfterLogin /> : <NavlinksBeforeLogin />}
      </nav>
    </div>
  );
}

export default DesktopNavigation;
