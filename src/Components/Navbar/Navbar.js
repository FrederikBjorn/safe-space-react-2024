import React from "react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
    </>
  );
}

export default Navbar;
