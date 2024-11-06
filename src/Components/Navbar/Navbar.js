import React, { useEffect, useState } from "react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import "./Navbar.css";
import Parse from "parse";

function Navbar() {
  const [authenticatedUser, setAuthenticatedUser] = useState(false); // assuming false means not authenticated

  // Check if the user is authenticated
  useEffect(() => {
    const currentUserCheck = Parse.User.current();

    if (currentUserCheck === !null) {
      console.log("currentUser is not null");
      if (currentUserCheck.authenticated()) {
        console.log("currentUserCheck = true");
        setAuthenticatedUser(true);
      } else {
        console.log("currentUserCheck = false");
        setAuthenticatedUser(false);
      }
    } else {
      console.log("currentUser is null");
    }
  }, []);

  return (
    <>
      <DesktopNavigation authenticatedUser={authenticatedUser} />
      <MobileNavigation authenticatedUser={authenticatedUser} />
    </>
  );
}

export default Navbar;
