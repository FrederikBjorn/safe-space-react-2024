import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import NavlinksAfterLogin from "./NavlinksAfterLogin.js";
import NavlinksBeforeLogin from "./NavlinksBeforeLogin.js";
import "./Navbar.css";
import { useUserStore } from "../UserData/useUserStore.js";

function MobileNavigation() {
  const [click, setClick] = useState(false);
  const { currentUser } = useUserStore();

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

  return (
    <div className="navbar" id="navbar-mobile">
      <nav className="MobileNavigation">
        <div className="logo">
          <img src="Images/icon.png" alt="logo" width="90" height="81" />
        </div>
        {click ? Close : Hamburger}

        {click &&
          (currentUser ? (
            <NavlinksAfterLogin isClicked={true} closeMenu={closeMenu} />
          ) : (
            <NavlinksBeforeLogin isClicked={true} closeMenu={closeMenu} />
          ))}
      </nav>
    </div>
  );
}

export default MobileNavigation;
