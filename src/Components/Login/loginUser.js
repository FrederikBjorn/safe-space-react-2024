import { React, useState } from "react";
import "./loginUser.css";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

export default function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Function that will return current user and also update current username
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  const loginUser = async () => {
    try {
      const loggedInUser = await Parse.User.logIn(username, password);

      console.log("Username:", username);
      console.log("Password:", password);
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get(
          "username"
        )} has successfully signed in!`
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername("");
      setPassword("");
      // Update state variable holding current user
      getCurrentUser();
      navigate("/chat");
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <form
      className="loginForm"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent page reload
        loginUser();
      }}
    >
      {/*forms for username and password*/}

      <div className="login-square container-sm bg-white">
        <h2 className="login-header text-header">Log in</h2>

        <div className="forms">
          {/*logic for handeling the user login - username*/}
          <div className="form-container">
            {/* <label htmlFor="userName"> Login </label> */}
            <input
              className="userName message-text bg-white"
              type="text"
              placeholder="Enter user name"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          {/*logic for handeling the user login - password*/}

          <div className="form-container">
            {/* <label htmlFor="password"> Password </label> */}
            <input
              className="password message-text bg-white"
              type="password"
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        <button type="submit">Login</button>
      </div>
    </form>
  );
}
