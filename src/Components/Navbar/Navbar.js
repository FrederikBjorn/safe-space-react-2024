import React, { useEffect, useState } from "react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import "./Navbar.css";
import Parse from "parse";

function Navbar() {
  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
    </>
  );
}

export default Navbar;
