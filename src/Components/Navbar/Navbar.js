import React, { useEffect, useState } from "react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import "./Navbar.css";
import Parse from "parse";

function Navbar() {
  const [authenticatedUser, setAuthenticatedUser] = useState(false); // assuming false means not authenticated
  const currentUserCheck = Parse.User.current();

  // Check if the user is authenticated or based on path
  useEffect(() => {
    // You can update this based on your auth logic
    if (currentUserCheck) {
      console.log("currentUserCheck = true");
      setAuthenticatedUser(true);
    } else {
      console.log("currentUserCheck = false");
      setAuthenticatedUser(false);
    }
  }, [currentUserCheck]);

  return (
    <>
      <DesktopNavigation authenticatedUser />
      <MobileNavigation authenticatedUser />
    </>
  );
}

export default Navbar;
