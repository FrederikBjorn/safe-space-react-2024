import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useUserLogOut } from "../Authentication/useUserLogOut";

function NavlinksAfterLogin({ isClicked, closeMenu }) {
  const { userLogOut } = useUserLogOut();
  const [isActive, setActive] = useState("homepage");
  const location = useLocation();

  const handleLogout = async () => {
    await userLogOut();
    if (isClicked) {
      closeMenu();
    }
  };

  useEffect(() => {
    const path = location.pathname.substring(1);
    setActive(path || "homepage");
  }, [location]);

  return (
    <nav className="navlinks">
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
          <Link
            className={` ${isActive === "homepage" ? "active-link" : ""}`}
            to="/homepage"
          >
            Home
          </Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link
            className={` ${isActive === "chatpage" ? "active-link" : ""}`}
            to="/chatpage"
          >
            Chat
          </Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/diarypage">Diary</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/calendarpage">Calendar</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/exercisespage">Exercises</Link>
        </li>
        <li onClick={handleLogout}>
          <Link>Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavlinksAfterLogin;
