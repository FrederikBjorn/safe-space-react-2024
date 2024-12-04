import React from "react";
import NavlinksAfterLogin from "./NavlinksAfterLogin.js";
import NavlinksBeforeLogin from "./NavlinksBeforeLogin.js";
import "./Navbar.css";
import { useUserStore } from "../UserData/useUserStore.js";
import { useNavigate } from "react-router-dom";

function DesktopNavigation() {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="navbar" id="navbar-desktop">
      <nav className="DesktopNavigation">
        <div className="logo">
          <img
            src="images/icon.png"
            alt="logo"
            width="100"
            height="90"
            onClick={() => navigate("/")}
          />
        </div>
        {currentUser ? <NavlinksAfterLogin /> : <NavlinksBeforeLogin />}
      </nav>
    </div>
  );
}

export default DesktopNavigation;
