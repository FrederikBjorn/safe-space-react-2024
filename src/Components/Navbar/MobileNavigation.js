import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import Navlinks from "./Navlinks.js";
import "./Navbar.css";
import NavbarScroll from "../NavbarScroll.js";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";

function MobileNavigation() {
  const [click, setClick] = useState(false);

  const Hamburger = (
    <RxHamburgerMenu
      className="HamburgerMenu"
      size="35px"
      color="#333"
      onClick={() => setClick(!click)}
    />
  );

  const Close = (
    <IoCloseOutline
      className="HamburgerMenu"
      size="35px"
      color="#333"
      onClick={() => {
        setClick(!click);
      }}
    />
  );

  function closeMenu() {
    setClick(false);
  }

  NavbarScroll("navbar-mobile", click, closeMenu);

  // Function to handle logo click
  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault(); // Prevent the default navigation
      window.location.reload(); // Reload the page
    }
  };

  return (
    <div className="navbar" id="navbar-mobile">
      <nav className="MobileNavigation">
        <Fade direction="down" triggerOnce={true}>
          <div className="logo">
            <Link to="/" onClick={handleLogoClick}>
              <img src="Images/icon.png" alt="logo" width="144" height="130" />
            </Link>
          </div>
        </Fade>
        {click ? Close : Hamburger}
        {click && <Navlinks isClicked={true} closeMenu={closeMenu} />}
      </nav>
    </div>
  );
}

export default MobileNavigation;
