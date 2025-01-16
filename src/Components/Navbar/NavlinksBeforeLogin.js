import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function NavlinksBeforeLogin({ isClicked, closeMenu }) {
  const [isActive, setActive] = useState("homepage");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    setActive(path || "homepage");
  }, [location]);

  return (
    <nav className="navlinks">
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
          <Link
            className={` ${isActive === "loginpage" ? "active-link" : ""}`}
            to="/loginpage"
          >
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavlinksBeforeLogin;
