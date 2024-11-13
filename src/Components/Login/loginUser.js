import { React, useState } from "react";
import "./loginUser.css";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

export default function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };

  const loginUser = async () => {
    try {
      const loggedInUser = await Parse.User.logIn(username, password);

      console.log("Username:", username);
      console.log("Password:", password);
      alert(
        `Success! User ${loggedInUser.get(
          "username"
        )} has successfully signed in!`
      );
      const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      setUsername("");
      setPassword("");
      getCurrentUser();
      navigate("/chat");
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <form
      className="loginForm"
      onSubmit={(e) => {
        e.preventDefault();
        loginUser();
      }}
    >
      <div className="login-square container-sm bg-white">
        <h2 className="login-header text-header">Log in</h2>

        <div className="forms">
          <div className="form-container">
            <input
              className="userName message-text bg-white"
              type="text"
              placeholder="Enter user name"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="form-container">
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
