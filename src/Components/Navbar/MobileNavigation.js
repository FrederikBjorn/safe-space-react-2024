import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import Navlinks from "./Navlinks.js";
import "./Navbar.css";
import NavbarScroll from "../NavbarScroll.js";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation(); // Get the current location

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
        <div className="logo">
          <Link to="/" onClick={handleLogoClick}>
            <img src="Images/icon.png" alt="logo" width="100" height="90" />
          </Link>
        </div>
        {click ? Close : Hamburger}
        {click && <Navlinks isClicked={true} closeMenu={closeMenu} />}
      </nav>
    </div>
  );
}

export default MobileNavigation;
