import React from "react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
      <div className="nav-whitespace"></div>
    </>
  );
}

export default Navbar;
