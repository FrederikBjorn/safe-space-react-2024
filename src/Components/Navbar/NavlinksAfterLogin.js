import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Parse from "parse";

function NavlinksAfterLogin({ isClicked, closeMenu }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogOut();
    if (isClicked) {
      closeMenu();
    }
  };

  // Function that will return current user and also update current username
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  const userLogOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        alert("Success! No user is logged in anymore!");
      }
      // Update state variable holding current user
      getCurrentUser();
      navigate("/");
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <nav className="navlinks">
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Chat</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Diary</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Calendar</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          <Link to="/">Exercises</Link>
        </li>
        <li onClick={handleLogout}>
          <Link>Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavlinksAfterLogin;
